var express = require('express');
var router = express.Router();
var ProductApi = require('./api/products');
var CartApi = require('./api/cart');

router.get('/', function(req, res) {
    res.json({ data: 'Welcome to food shop api ' });   
});

router.post('/cart', function(req, res) {
  var productId = req.body.product_id;
  console.log('req= ', req);
  var quantity = Number(req.body.quantity);
  (new CartApi(req.sessionID)).addToCart(productId, quantity, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ data: result}); 

  });
});

router.delete('/cart', function(req, res) {
  var productId = req.body.product_id;
  (new CartApi(req.sessionID)).deleteFromCart(productId, function(err, result) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ data: result}); 
  });
});

router.get('/cart', function(req, res) {
  (new CartApi(req.sessionID)).getCart(function(err, result) {
    if (err) {
      res.send(err);
      return;
    }
    
    if (!result) {
      res.send("No cart");
      return;
    }

    console.log(result.cartItems.map(p => p.id));
    (new ProductApi).getProductsByIds(result.cartItems.map(p => p.productId), function (err, productsById) {
      if (err) {
        res.send(err);
        return;
      }

      var total_sum = 0;
      var products_count = 0;
      result.cartItems.forEach(function(product) {
        prodObj = productsById[product.productId];
        console.log(productsById, product.productId);
        total_sum += prodObj.price * product.quantity;
        products_count += product.quantity
      });
      res.json({
        total_sum,
        products_count,
        data: result
      });
    }); 
  });      
});

router.get('/products', function(req, res) {
  (new ProductApi()).getProducts(function(err, result) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({ data: result });
  });  
});


module.exports = router;