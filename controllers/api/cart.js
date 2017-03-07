var express = require('express');
var router = express.Router();
var Product = require('../../models/product');
var Cart = require('../../models/cart');

router.post('/', (req, res) => {
  const productId = req.body.product_id;
  const quantity = Number(req.body.quantity);
  Cart.addToCart(req.sessionID, productId, quantity, (err, result) => {
    if (err) 
      return res.send(err);

    res.json({ data: result}); 
  });
});

router.delete('/', (req, res) => {
  const productId = req.body.product_id;
  Cart.deleteFromCart(req.sessionID, productId, (err, result) => {
    if (err) 
      return res.send(err);

    res.json({ data: result}); 
  });
});

router.get('/', (req, res) => {
  Cart.getCart(req.sessionID, function(err, result) {
    if (err) 
      return res.send(err);
    
    if (!result) 
      return res.send("No cart");

    Product.getProductsByIds(result.cartItems.map(p => p.productId), (err, productsById) => {
      if (err)
        return res.send(err);

      let total_sum = 0;
      let products_count = 0;
      result.cartItems.forEach((product) => {
        prodObj = productsById[product.productId];
        total_sum += prodObj.price * product.quantity;
        products_count += product.quantity
      });
      res.json({
        total_sum,
        products_count,
        data: result.cartItems
      });
    }); 
  });      
});

module.exports = router;