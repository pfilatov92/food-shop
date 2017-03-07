var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Welcome to food shop api. Visit /api/products to look at available products and /api/cart to look at your cart');   
});

router.use('/api/products', require('./api/products'));
router.use('/api/cart', require('./api/cart'));

module.exports = router;