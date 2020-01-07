var express = require('express');
var router = express.Router();
const controller = require ('../controllers/index');

router.get('/',controller.index);

router.get('/about', controller.about);

router.get('/checkout', controller.checkout);

router.get('/contact', controller.contact);

router.get('/faqs', controller.faqs);


module.exports = router;
