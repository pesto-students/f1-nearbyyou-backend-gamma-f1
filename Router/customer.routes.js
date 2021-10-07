const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const customerController = require('../controller/customer.controller'); 

//Register
router.post('/register', customerController.signup);

//Login
router.post('/login', customerController.login);

//Search
router.post('/search', auth, customerController.search);

module.exports = router;