const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    id_user:{type:String, require:true},
    id_cart:{type:String, require:true},
    address: { type: String, require: true },
    city: {type: String, require: true },
    dateAdd: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('HoaDon', billSchema, "HoaDon");