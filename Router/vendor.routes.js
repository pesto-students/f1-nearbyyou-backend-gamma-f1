const express = require('express');
const router = express.Router();
const vendorController = require('../controller/vendor.controller');
const { vendor_create, add_shop_validate,validate}= require('../middleware/vendorValidation');
const shopBrnachController = require('../controller/shopBranch.controller')

router.post('/signup',vendor_create(),validate, vendorController.signup);

router.post('/addShop', add_shop_validate(), validate,shopBrnachController.addShop);
router.put('/shop/:id',shopBrnachController.editShop);
router.delete('/shop/:id',shopBrnachController.deleteShop);


module.exports = router;