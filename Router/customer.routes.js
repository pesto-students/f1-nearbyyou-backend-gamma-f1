const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const customerController = require('../controller/customer.controller');
const userController = require('../controller/user.controller')
const { loginValidation, signUpValidation, validate } = require('../middleware/customerValidation')

//Register
router.post('/register', signUpValidation(), validate, customerController.signup);

//Login
router.post('/login', loginValidation(), validate, userController.login);

//Search
router.post('/search', auth, customerController.search);

//Category
router.post('/category', customerController.category);

//Get Category ID
router.post('/getCategoryId', customerController.getCategoryID);

//Details
router.post('/detail', auth, customerController.detail);

//add Ticket
router.post('/ticket', auth, customerController.ticket);

//View Ticket
router.post('/viewTicket', auth, customerController.viewTicket);

//User Details
router.post('/userDetails', auth, customerController.userDetails);

//Profile Edit
router.post('/profileEdit', auth, customerController.profileEdit);

//Upload Image
router.post('/uploadImage', customerController.uploadImage);

//Acceot Reject Holding Request
router.post('/acceptRejectHoldingReq', customerController.acceptRejectShopRequest);


module.exports = router;