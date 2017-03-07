var mongoose = require('../lib/mongoose');
var Schema       = mongoose.Schema;

var ProductSchema = new Schema({
    id: String,
    name: String,
    description: String,
    price: Number
});

module.exports = mongoose.model('Product', ProductSchema);
