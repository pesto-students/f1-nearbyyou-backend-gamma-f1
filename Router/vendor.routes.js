const express = require('express');
const router = express.Router();
const vendorController = require('../controller/vendor.controller');

router.post('/signup', vendorController.signup);


module.exports = router;