var express = require('express');
var router = express.Router();
var Product = require('../../models/product');
var Cart = require('../../models/cart');
var Validators = require('../../lib/validators');
var Errors = require('../../lib/errors')

router.post('/', (req, res) => {
    const productId = req.body.product_id;
    const quantity = req.body.quantity;
    let validationErr = Validators.isRequiredParam('product_id', productId) ||
                        Validators.isRequiredParam('quantity', quantity) ||
                        Validators.isIntParam('quantity', quantity) ||
                        Validators.isInRangeParam('quantity', quantity, 1, 10)
    if (validationErr)
        return res.status(400).json(validationErr);
    Cart.addToCart(req.sessionID, productId, Number(quantity), (err, result) => {
        if (err) 
            return res.status(500).json(Errors.createInternalServerError(err));

        return res.json({}); 
    });
});

router.delete('/', (req, res) => {
  const productId = req.body.product_id;
  let validationErr = Validators.isRequiredParam('product_id', productId);
  if (validationErr)
        return res.status(400).json(validationErr);
  Cart.deleteFromCart(req.sessionID, productId, (err, result) => {
    if (err) 
      return res.status(500).json(Errors.createInternalServerError(err));

    return res.json({ data: result}); 
  });
});

router.get('/', (req, res) => {
  Cart.getCart(req.sessionID, function(err, result) {
    if (err) 
      return res.json(err);//check if no cart?

    Product.getProductsByIds(result.cartItems.map(p => p.productId), (err, productsById) => {
      if (err)
        return res.status(500).json(Errors.createInternalServerError(err));

      let total_sum = 0;
      let products_count = 0;
      result.cartItems.forEach((product) => {
        prodObj = productsById[product.productId];
        total_sum += prodObj.price * product.quantity;
        products_count += product.quantity
      });
      return res.json({
        data: {
          total_sum,
          products_count,
          products: result.cartItems
        }
      });
    }); 
  });      
});

module.exports = router;