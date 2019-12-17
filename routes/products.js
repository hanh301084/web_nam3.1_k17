var express = require('express');
var router = express.Router();
const controller =require('../controllers/products');

router.get('/:page',controller.product);

router.get('/sort_price/:page',controller.product_sort_price);

router.get('/sort_name/:page',controller.product_sort_name);

router.get('/product_detail/:id',controller.product_detail);

router.get('/:type/:page',controller.product_type);


module.exports = router;