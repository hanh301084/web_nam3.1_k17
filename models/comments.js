const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    id_product:{type:String, require:true},
    name: { type: String, require: true },
    comment:{type: String,require:true},
    dateAdd: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('BinhLuan', commentsSchema, "BinhLuan");