const Products = require('../models/products')
const Cart = require('../models/cart');
const Bill = require('../models/bill');
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
    res.render('checkout', {
        title1: '', title2: '', title3: '', title4: 'selected', title5: '', title6: '', title7: '',
        user: req.user
    });
}
exports.order = async (req, res) => {
    try {
        if (req.user) {
            const cart = await Cart.findById(req.session.cart._id);
            const bill = new Bill({
                id_user: req.user._id,
                id_cart: req.session.cart._id,
                address: req.body.address,
                city: req.body.city,
                total: cart.totalMoney,
                status: "đặt hàng"
            });
            const saveBill = await bill.save();
            res.redirect('/products/0');
        }
        else {
            res.render('error', {
                title1: '', title2: '', title3: '', title4: '', title5: '', title6: '', title7: '', user: req.user,
                message: 'Bạn cần đăng nhập trước khi thanh toán'
            });
        }
    } catch (err) {
        res.json({ message: err });
    }
}
exports.contact = function (req, res, next) {
    res.render('contact', { title1: '', title2: '', title3: '', title4: '', title5: 'selected', title6: '', title7: '', user: req.user });
}

exports.faqs = function (req, res, next) {
    res.render('faqs', { title1: '', title2: '', title3: '', title4: '', title5: '', title6: 'selected', title7: '', user: req.user });
}

exports.shoppingcart = async (req, res) => {
    try {
        if (req.session.cart) {
            const cart = await Cart.findById(req.session.cart._id);  console.log(cart.id_product);
            const arr = await Products.find({ _id: { $in: cart.id_product } });
            res.render('shoppingcart', {
                title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
                user: req.user, _cart: arr, i: 0, total: cart.totalMoney
            });
        }
        else {
            res.render('shoppingcart', {
                title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
                user: req.user, _cart: null
            });
        }
    } catch (err) {
        res.json({ message: err });
    }
}
