const express = require('express');
const router = express.Router();
const vendorController = require('../controller/vendor.controller');
const { vendor_create, add_shop_validate,validate}= require('../middleware/vendorValidation');
const shopBrnachController = require('../controller/shopBranch.controller')

//vendor sign up api route
router.post('/signup',vendor_create(),validate, vendorController.signup);

//vendor shop api
router.post('/createShop', add_shop_validate(), validate,shopBrnachController.createShop);
router.get('/shop/:id',shopBrnachController.findOneShop);
router.get('/shop',shopBrnachController.findAll);
router.put('/shop/:id',shopBrnachController.editShop);
router.delete('/shop/:id',shopBrnachController.deleteShop);



//shop service api
// router.post('/shop/addService', add_shop_service_validate(), validate,shopServiceController.addShopService);
// router.get('/shop/service',shopServiceController.getShopAllService);
// router.get('/shop/service/:id',shopServiceController.getShopServiceDetails);
// router.put('/shop/service/:id',shopServiceController.editShopService);
// router.delete('/shop/:id',shopServiceController.deleteShopService);




module.exports = router;