const Products = require('../models/products')

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
            page_current: page*1, 
            flag_end_page: products.length
        });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.product_type=async (req, res) => {
    try {
        const type = req.params.type;
        const page = req.params.page;
        const products = await Products.find({"type":type}).skip(page * 8).limit(8);
        //res.json(posts);
        res.render('products', {
            title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            user: req.user,
            page_current: page*1, 
            type:type,
            flag_end_page: products.length
        });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.product_low_price=async (req, res) => {
    try {
        const page = req.params.page;
        const products = await Products.find({"price": {$lt:30000}}).sort({"price":1}).skip(page * 8).limit(8);
        //res.json(posts);
        res.render('products', {
            title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            user: req.user,
            type: "low_price",
            page_current: page*1, 
            flag_end_page: products.length
        });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.product_hight_price=async (req, res) => {
    try {
        const page = req.params.page;
        const products = await Products.find({"price": {$gt:35000}}).sort({"price":-1}).skip(page * 8).limit(8);
        //res.json(posts);
        res.render('products', {
            title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            user: req.user,
            type: "hight_price",
            page_current: page*1, 
            flag_end_page: products.length
        });
    } catch (err) {
        res.json({ message: err });
    }
}



