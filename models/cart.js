var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');

var CartSchema = new Schema({
    sessionId: String,
    cartItems: [{
        productId: String,
        quantity: Number
    }]
});

var deleteTimers = {};

CartSchema.statics.deleteCart = (sessionId) => {
    Cart.remove({sessionId: sessionId}).exec();
    deleteTimers[sessionId] = null;
}

CartSchema.statics.getCart = (sessionId, callback) => {
    Cart.findOne({sessionId: sessionId}, (err, cart) => {
        if (!cart) 
            cart = new Cart({sessionId: sessionId});

        let prevTimer = deleteTimers[sessionId];
        if (prevTimer) 
            clearTimeout(prevTimer);
        
        deleteTimers[sessionId] = setTimeout(() => { Cart.deleteCart(sessionId)}, 30000);//change to 300000
        callback(err, cart);
    });
} 

CartSchema.statics.addToCart = (sessionId, productId, quantity, callback) => {
    Product.getProduct(productId, (err, product) => {
        if (err)
            return callback(err);

        if (!product)
            return callback(`No such product with product_id: ${productId}`);
        
        Cart.getCart(sessionId, (err, cart) => {
            if (err)
                return callback(err);

            let item = cart.cartItems.find(i => i.productId == productId);
            if (!item) {
                cart.cartItems.push({
                    productId,
                    quantity: quantity
                });
            }
            else item.quantity = item.quantity + quantity;

            cart.save(callback(err, cart));
        });
    });
}

CartSchema.statics.deleteFromCart = (sessionId, productId, callback) => {
    Cart.getCart(sessionId, (err, cart) => {
        if (err)
            return callback(err);

        let itemInd = cart.cartItems.findIndex(i => i.productId == productId);
        if (itemInd > -1) {
            if (cart.cartItems[itemInd].quantity == 1)
                cart.cartItems.splice(itemInd, 1);
            else cart.cartItems[itemInd].quantity--;
        } else return callback(`No such product in cart with product_id: ${productId}`);

        cart.save(callback(err, cart));
    });
}

var Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;