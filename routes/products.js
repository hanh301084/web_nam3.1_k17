var express = require('express');
var router = express.Router();
const controller =require('../controllers/products');

router.get('/:page',controller.product);

router.get('/low_price/:page',controller.product_low_price);

router.get('/hight_price/:page',controller.product_hight_price);

router.get('/:type/:page',controller.product_type);


module.exports = router;