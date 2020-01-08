const mongoose = require('mongoose');

//const listProducts=new Schema({id_product:{type:String, require:true}});
const cartSchema = mongoose.Schema({
    id_product:{type:Array, require:true},
    totalQuantities:{type:Number, require:true},
    totalMoney:{type:Number, require:true},
    dateAdd: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('GioHang', cartSchema, "GioHang");