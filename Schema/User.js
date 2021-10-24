var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    user_name: {
        type: String,
        required: true
    },
    user_role: {
        type: String,
        default: "customer",
        enum: ["customer", "vendor", "admin"],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    encrypted_passord: {
        type: String,
        // required: true
    },
    // accessToken: {
    //     type: String
    // },
    // vendors:{
    //     type:Schema.Types.ObjectId,
    //     ref:"Vendor"
    // },
    // Customer:{
    //     type:Schema.Types.ObjectId,
    //     ref:"Customer"
    // },
},{
    timestamps: true
});

module.exports = mongoose.model('User', user);