var express = require('express');
var router = express.Router();
var Errors = require('../lib/errors');

router.get('/', function(req, res) {
    res.json('Welcome to food shop api. Visit /api/products to look at available products and /api/cart to look at your cart');   
});

router.use('/api/products', require('./api/products'));
router.use('/api/cart', require('./api/cart'));

router.use("*", (req, res) => {
    res.status(404).json(Errors.createInvalidRequestError(req.originalUrl));
})

module.exports = router;