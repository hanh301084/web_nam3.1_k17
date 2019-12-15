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

