var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var payment = new Schema({
    payment_status:{
        type:String,
        required:true
    },
    payment_date:{
        type:Date,
        required:true
    },
    payment_vendor:{
        type: Schema.Types.ObjectId,
        ref:'shopBranch',
        required: true
    },
    payment_plan:{
        type: Schema.Types.ObjectId,
        ref:'Plan',
        required: true
    },
    timestamps: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Payment', payment);