const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    price: {type: Number, require: true},
    description: { type: String, require: false},
    imagPath: { type: String, require: true },
    dateAdd: {
        type: Date,
        default: Date.now
    }
});
module.exports=mongoose.model('SanPham',productsSchema, "SanPham");