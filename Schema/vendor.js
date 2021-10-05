var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendor = new Schema({
    shop_name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    user_type:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    shop_branches:[{
        type:Schema.Types.ObjectId,
        ref:"ShopBranch",
        required: true
    }],
    vendor_category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },
    payments:[{
        type:Schema.Types.ObjectId,
        ref:"Payment",
        required: true
    }],
    timestamps: true
});

module.exports = mongoose.model('Vendor', vendor);