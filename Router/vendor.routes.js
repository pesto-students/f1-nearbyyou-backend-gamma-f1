const express = require('express');
const router = express.Router();
const vendorController = require('../controller/vendor.controller');

router.post('/signup', vendorController.signup);

router.post('/addShop',vendorController.addShop);
router.put('/shop/:id',vendorController.editShop);
router.delete('/shop/:id',vendorController.deleteShop);


module.exports = router;