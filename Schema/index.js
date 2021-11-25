var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var grocery = new Schema({
    name: String,
    color: String,
    quantity: Number,
    user_id:Number
});

var login = new Schema({
    userName: String,
    password: String,
    user_id: Number
});


const groceryDataSchema = mongoose.model('grocery', grocery);
const loginSchema = mongoose.model('login', login);

module.exports = { groceryDataSchema: groceryDataSchema, loginSchema: loginSchema }