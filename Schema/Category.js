var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var category = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    // vendors:[{
    //     type: Schema.Types.ObjectId,
    //     ref:'Vendor',
    // }],
    // shop_category:[{
    //     type: Schema.Types.ObjectId,
    //     ref:'shopBranch',
    // }],
    timestamps: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Category', category);