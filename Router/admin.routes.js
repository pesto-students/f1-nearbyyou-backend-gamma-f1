const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const userController = require('../controller/user.controller')

//Login
router.post('/login', userController.login);

module.exports = router;