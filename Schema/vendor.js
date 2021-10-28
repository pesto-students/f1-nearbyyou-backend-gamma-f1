var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vendor = new Schema({
    shop_name: {
        type: String,
        // required: true
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
    vendor_category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Vendor', vendor);