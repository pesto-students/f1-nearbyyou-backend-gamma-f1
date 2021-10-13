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
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // shop_branches: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "ShopBranch",
    // }],
    // vendor_category: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true
    // }],
    timestamps: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Vendor', vendor);