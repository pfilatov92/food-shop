var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    id: String,
    name: String,
    description: String,
    price: Number
});

ProductSchema.statics.getProducts = (callback) => {
    Product.find({}, (err, products) => {
        callback(err, products)
    });
} 

ProductSchema.statics.getProductsByIds = (productIds, callback) => {
    Product.find({id: {$in: productIds}}, (err, products) => {
        if (err) {
            callback(err);
            return;
        }

        var result = {};
        products.forEach(p => result[p.id] = p);
        callback(err, result);
    }); 
}

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
