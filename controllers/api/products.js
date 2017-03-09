var express = require('express');
var router = express.Router();
var Product = require('../../models/product');

router.get('/', (req, res) => {
  Product.getProducts((err, result) => {
    if (err)
      return res.status(500).json(Errors.createInternalServerError(err));;

    res.json({ data: result });
  });  
});

module.exports = router;