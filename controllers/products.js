const Products = require('../models/products')
const Comments = require('../models/comments');
const Cart = require('../models/cart');

exports.product = async (req, res) => {
    try {
        const page = req.params.page;
        const products = await Products.find().skip(page * 8).limit(8);
        //res.json(posts);
        res.render('products', {
            title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            user: req.user,
            type: null,
            page_current: page * 1,
            flag_end_page: products.length
        });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.product_type = async (req, res) => {
    try {
        const type = req.params.type;
        const page = req.params.page;
        const products = await Products.find({ "type": type }).skip(page * 8).limit(8);
        //res.json(posts);
        res.render('products', {
            title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            user: req.user,
            page_current: page * 1,
            type: type,
            flag_end_page: products.length
        });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.product_sort_price = async (req, res) => {
    try {
        const page = req.params.page;
        const products = await Products.find().sort({ "price": 1 }).skip(page * 8).limit(8);
        res.render('products', {
            title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            user: req.user,
            type: "sort_price",
            page_current: page * 1,
            flag_end_page: products.length
        });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.product_detail = async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Products.findById(id);
        const upPro=await Products.updateOne({_id:products._id},
            {
                $set:{
                    view: products.view +1
                }
            });
        const productsOther = await Products.find({ "type": products.type });
        const listComment = await Comments.find({ "id_product": id }).skip(req.params.page_comment * 5).limit(5);
        //res.json(posts);
        res.render('productdetail', {
            title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            ProductsOther: productsOther,
            ListComment: listComment, page_comment_current: req.params.page_comment * 1, j: 0,
            user: req.user
        });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.product_sort_name = async (req, res) => {
    try {
        const page = req.params.page;
        const products = await Products.find().sort({ "name": 1 }).skip(page * 8).limit(8);
        //res.json(posts);
        res.render('products', {
            title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            user: req.user,
            type: "sort_name",
            page_current: page * 1,
            flag_end_page: products.length
        });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.post_comment = async (req, res) => {
    const cment = new Comments({
        id_product: req.params.id,
        name: req.body.name,
        comment: req.body.comment
    });
    try {
        const saveCment = await cment.save();
        res.redirect('/products/0');  //trả về trang hiện tại
    } catch (err) {
        res.json({ message: err });
    }
}

exports.add_cart = async (req, res) => {
    try {  
        const pro=await Products.findById(req.params.id);
        if (req.session.cart) {           
            const add1 = await Cart.updateOne({ _id: req.session.cart._id }, {
                $push: {
                    id_product: req.params.id
                }
            });
            const add2 = await Cart.updateOne({ _id: req.session.cart._id }, {
                $set: {                
                    totalQuantities: req.session.cart.totalQuantities + 1,
                    totalMoney:req.session.cart.totalMoney+pro.price
                }
            });
            const addCart = await Cart.findById(req.session.cart._id);
            req.session.cart = addCart;
        }
        else { console.log("123");  
            const addCart = new Cart({
                id_product: [req.params.id],
                totalQuantities: 1,
                totalMoney:pro.price
            });
            const saveCart = await addCart.save();
            req.session.cart = saveCart;
        }
        console.log(req.session.cart);
        res.redirect("/shoppingcart");
    } catch (err) {
        res.json({ message: err });
    }
}

exports.remove_cart = async (req, res) => {
    try {
        const pro = await Products.findById(req.params.id);
        const add1 = await Cart.updateOne({ _id: req.session.cart._id }, {
            $pull: {
                id_product: req.params.id
            }
        });
        const add2 = await Cart.updateOne({ _id: req.session.cart._id }, {
            $set: {
                totalQuantities: req.session.cart.totalQuantities - 1,
                totalMoney: req.session.cart.totalMoney - pro.price
            }
        });
        const addCart = await Cart.findById(req.session.cart._id);
        req.session.cart = addCart;
        console.log(req.session.cart);
        res.redirect("/shoppingcart");
    } catch (err) {
        res.json({ message: err });
    }
}

