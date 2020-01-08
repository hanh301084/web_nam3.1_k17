var express = require('express');
var router = express.Router();
const controller = require ('../controllers/index');

router.get('/',controller.index);

router.get('/about', controller.about);

router.get('/checkout', controller.checkout);
router.post('/checkout', controller.order);

router.get('/contact', controller.contact);

router.get('/faqs', controller.faqs);

router.get('/shoppingcart',controller.shoppingcart);

module.exports = router;
