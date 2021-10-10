const express = require('express');
const router = express.Router();
const vendorController = require('../controller/vendor.controller');
const { vendor_create, validatevendor}= require('../middleware/vendorValidation');
const shopBrnachController = require('../controller/shopBranch.controller');
const serviceController = require('../controller/service.controller');
const auth=require('../middleware/auth');
const { add_shop_validate, edit_shop_validate, validateShop}= require('../middleware/shopValidation');
const {add_shop_service_validate, getservice, validateService} = require('../middleware/serviceValidation');
//vendor sign up api route
router.post('/signup',vendor_create(),validatevendor, vendorController.signup);

//vendor shop api
router.post('/createShop',auth , add_shop_validate(), validateShop,shopBrnachController.createShop);
router.get('/shop/:id',auth , shopBrnachController.findOneShop);
router.get('/shop',auth, shopBrnachController.findAll);
router.put('/shop/:id',auth ,edit_shop_validate(), validateShop, shopBrnachController.editShop);
router.delete('/shop/:id',auth , shopBrnachController.deleteShop);



//shop service api
router.post('/shop/createService',auth, add_shop_service_validate(), validateService, serviceController.createShopService);
router.get('/service',auth,getservice(),validateService ,serviceController.getShopAllService);
router.get('/service/:id',auth, serviceController.findOneShopService);
router.put('/service/:id',auth, serviceController.editShopService);
router.delete('/service/:id', auth, serviceController.deleteShopService);




module.exports = router;