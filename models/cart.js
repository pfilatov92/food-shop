var mongoose     = require('../lib/mongoose');
var Schema       = mongoose.Schema;

var CartSchema = new Schema({
    sid: String,
    cartItems: [{
        productId: String,
        quantity: Number
    }]
});

module.exports = mongoose.model('Cart', CartSchema);