var Product = require('../models/product');

function ProductApi() {} 

ProductApi.prototype.getProducts = function (callback) {
    Product.find({}, function (err, products) {
        callback(err, products)
    });
} 

ProductApi.prototype.getProductsByIds = function (productIds, callback) {
    Product.find({id: {$in: productIds}}, function(err, products) {
        if (err)
            callback(err);//return

        var result = {};
        products.forEach(p => result[p.id] = p);
        callback(err, result);
    }); 
}

module.exports = ProductApi;