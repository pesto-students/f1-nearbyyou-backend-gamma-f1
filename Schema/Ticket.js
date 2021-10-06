var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticket = new Schema({
    ticket_number: {
        type: String,
        required: true
    },
    service_description: {
        type: String,
        required: true
    },
    service_date: {
        type: Date,
        required: true
    },
    service_time: {
        type: String,
        required: true
    },
    ticket_status: {
        type: String,
        default: "new",
        enum: ["new", "pending", "holding", "in_progress", "closed"],
        required: true
    },
    hold_date: {
        type: Date,
    },
    hold_time: {
        type: String,
    },
    hold_description: {
        type: String,
    },
    hold_status: {
        type: Boolean,
        default: "accept",
        enum: ["accept", "reject"]
    },
    ticket_owner: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    shop_ticket: {
        type: Schema.Types.ObjectId,
        ref: "shopBranch",
        required: true
    },
    timestamps: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Ticket', ticket);