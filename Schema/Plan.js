var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var plan = new Schema({
    name: {
        type: String,
        required: true
    },
    plan_type: {
        type: String,
        required: true
    },
    plan_price: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    vendor_payments:[{
        type: Schema.Types.ObjectId,
        ref:'Payment',
        required: true
    }],
    timestamps: true
});

module.exports = mongoose.model('Plan', plan);