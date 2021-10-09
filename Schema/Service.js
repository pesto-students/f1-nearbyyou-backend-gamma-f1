var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var service = new Schema({
    name: {
        type: String,
        required: true
    },
    service_description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    // service_owner:{
    //     type: Schema.Types.ObjectId,
    //     ref:'shopBranch',
    //     required: true
    // },
    timestamps: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Service', service);