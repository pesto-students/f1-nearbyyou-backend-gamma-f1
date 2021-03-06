var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shopBranch = new Schema({
    shop_email: {
        type: String,
        required: true
    },
    shop_contact_number: {
        type: String,
        required: true
    },
    shop_door_number: {
        type: String,
        required: true
    },
    shop_street: {
        type: String,
        required: true
    },
    shop_area: {
        type: String,
        required: true
    },
    shop_city_town: {
        type: String,
        required: true
    },
    shop_state: {
        type: String,
        required: true
    },
    shop_pincode: {
        type: Number,
        required: true
    },
    shop_status: {
        type: String,
        default: "pending",
        enum: ["pending", "payment_pending", "active", "reject", "inactive"]
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    shop_description: {
        type: String,
        required: true
    },
    shop_timings: {
        type: String,
    },
    shop_owner: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true
    },
    // shop_tickets:[{
    //     type:Schema.Types.ObjectId,
    //     ref:"Ticket",
    // }],
    // shop_services:[{
    //     type:Schema.Types.ObjectId,
    //     ref:"Service",
    // }],
    // payments:[{
    //     type:Schema.Types.ObjectId,
    //     ref:"Payment",
    //     required: true
    // }],
    shop_category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('shopBranch', shopBranch);