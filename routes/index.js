var express = require('express');
var router = express.Router();
const controller = require ('../controllers/index');

router.get('/',controller.index);



router.get('/about', function(req, res, next) {
  res.render('about', {title1: '', title2: 'selected',title3: '', title4: '',title5: '', title6: '' ,  title7: '', user:req.user  });
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout', {title1: '', title2: '',title3: '', title4: 'selected',title5: '', title6: '' ,  title7: '', user:req.user  });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title1: '', title2: '',title3: '',title4: '', title5: 'selected',  title6: '',  title7: '', user:req.user  });
});

router.get('/faqs', function(req, res, next) {
  res.render('faqs', { title1: '', title2: '',title3: '',title4: '', title5: '',  title6: 'selected' ,  title7: '', user:req.user });
});

router.get('/productdetail', function(req, res, next) {
  res.render('productdetail', { title1: '', title2: '',title3: 'selected',title4: '', title5: '',  title6: '' ,  title7: '', user:req.user });
});


module.exports = router;
