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

exports.product_sort_price=async (req, res) => {
    try {
        const page = req.params.page;
        const products = await Products.find().sort({"price":1}).skip(page * 8).limit(8);
        //res.json(posts);
        res.render('products', {
            title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            user: req.user,
            type: "sort_price",
            page_current: page*1, 
            flag_end_page: products.length
        });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.product_detail=async (req, res) => {
    try {
        const id = req.params.id;
        const products = await Products.findById(id);
        const productsOther= await Products.find({"type":products.type});
        //res.json(posts);
        res.render('productdetail', {
            title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            ProductsOther: productsOther,
            user: req.user
        });
    } catch (err) {
        res.json({ message: err });
    }
}

exports.product_sort_name=async (req, res) => {
    try {
        const page = req.params.page;
        const products = await Products.find().sort({"name":1}).skip(page * 8).limit(8);
        //res.json(posts);
        res.render('products', {
            title1: '', title2: '', title3: 'selected', title4: '', title5: '', title6: '', title7: '',
            Products: products, i: 0,
            user: req.user,
            type: "sort_name",
            page_current: page*1, 
            flag_end_page: products.length
        });
    } catch (err) {
        res.json({ message: err });
    }
}



