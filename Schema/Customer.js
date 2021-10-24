var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customer = new Schema({
    door_number: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city_town: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
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
    // customer_tickets:[{
    //     type:Schema.Types.ObjectId,
    //     ref:"Ticket",  
    // }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customer);