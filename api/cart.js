var Cart = require('../models/cart');
var _ = require('lodash');

function CartApi(sessionId) {
    this._sessionId = sessionId;
    var self = this;
    this.deleteCart = function () {
        console.log("Time to delete "+ self._sessionId)
        Cart.remove({sid: self._sessionId}).exec();
    }
}

CartApi.prototype.getCart = function (callback) {
    var self = this;
    Cart.findOne({sid: this._sessionId}, function(err, cart) {
        if (!cart) 
            cart = new Cart({sid: self._sessionId});
        
        if (self._timerId)
            clearTimeout(self._timerId);
        
        console.log('setTimer');
        self._timerId = setTimeout(self.deleteCart, 30000);
        callback(err, cart);
    });
} 

CartApi.prototype.addToCart = function (productId, quantity, callback) {
   this.getCart(function (err, cart) {
        if (err)
            callback(err);

        var item = cart.cartItems.find(i => i.productId == productId);
        if (!item) {
            console.log('add '+productId);
            cart.cartItems.push({
                productId,
                quantity: quantity
            });
        }
        else item.quantity = item.quantity + quantity;

        cart.save(callback(err, cart));
   })
}

CartApi.prototype.deleteFromCart = function (productId, callback) {
   this.getCart(function (err, cart) {
        if (err)
            callback(err);

        var itemInd = cart.cartItems.findIndex(i => i.productId == productId);
        if (itemInd > -1) {
            if (cart.cartItems[itemInd].quantity == 1)
                cart.cartItems.splice(itemInd, 1);
            else cart.cartItems[itemInd].quantity--;
        }

        cart.save(callback(err, cart));
   })
}

module.exports = CartApi;