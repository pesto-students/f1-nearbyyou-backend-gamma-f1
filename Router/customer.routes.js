const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const customerController = require('../controller/customer.controller'); 
const {loginValidation} = require('../middleware/customerValidation')

//Register
router.post('/register', customerController.signup);

//Login
router.post('/login', customerController.login);

//Search
router.post('/search', auth, customerController.search);

//Category
router.post('/category', customerController.category);

module.exports = router;