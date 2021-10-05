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
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    shop_owner:{
        type: Schema.Types.ObjectId,
        ref:'Vendor',
        required: true
    },
    shop_tickets:[{
        type:Schema.Types.ObjectId,
        ref:"Ticket",
        required: true
    }],
    shop_services:[{
        type:Schema.Types.ObjectId,
        ref:"Service",
        required: true
    }],
    timestamps: true
});

module.exports = mongoose.model('shopBranch', shopBranch);