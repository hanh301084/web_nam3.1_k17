const Products = require('../models/products')

exports.index = async (req, res) => {
    try {
        const products = await Products.find().limit(8);
        //res.json(posts);
        res.render('index', {
            title1: 'selected', title2: '', title3: '', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            user: req.user
        });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.about = function (req, res, next) {
    res.render('about', { title1: '', title2: 'selected', title3: '', title4: '', title5: '', title6: '', title7: '', user: req.user });
}

exports.checkout = function (req, res, next) {
    res.render('checkout', { title1: '', title2: '', title3: '', title4: 'selected', title5: '', title6: '', title7: '', user: req.user });
}

exports.contact = function (req, res, next) {
    res.render('contact', { title1: '', title2: '', title3: '', title4: '', title5: 'selected', title6: '', title7: '', user: req.user });
}

exports.faqs = function (req, res, next) {
    res.render('faqs', { title1: '', title2: '', title3: '', title4: '', title5: '', title6: 'selected', title7: '', user: req.user });
}
