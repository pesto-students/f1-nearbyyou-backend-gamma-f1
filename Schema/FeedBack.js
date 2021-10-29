var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedBack = new Schema({
    shopId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        required: true
    },
    feedBack: {
        type: String,
        required: true
    },
    rating: {
        type: String,
    required: true
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('FeedBack', feedBack);