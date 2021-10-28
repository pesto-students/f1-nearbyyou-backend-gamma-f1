const express = require('express');
const router = express.Router();
const vendorController = require('../controller/vendor.controller');
const { vendor_create, validatevendor } = require('../middleware/vendorValidation');
const shopBrnachController = require('../controller/shopBranch.controller');
const serviceController = require('../controller/service.controller');
const plansController = require('../controller/plans.controller');
const auth = require('../middleware/auth');
const { add_shop_validate, edit_shop_validate, validateShop } = require('../middleware/shopValidation');
const { add_shop_service_validate, getservice, validateService } = require('../middleware/serviceValidation');
const multer = require('multer');



//vendor sign up api route
router.post('/signup', vendor_create(), validatevendor, vendorController.signup);

//vendor shop api
router.post('/createShop', auth, add_shop_validate(), validateShop, shopBrnachController.createShop);
router.get('/shop/:id', auth, shopBrnachController.findOneShop);
router.get('/shop', auth, shopBrnachController.findAll);
router.put('/shop/:id', auth, edit_shop_validate(), validateShop, shopBrnachController.editShop);
router.delete('/shop/:id', auth, shopBrnachController.deleteShop);
//Upload Image
router.post('/shop/uploadImage', multer().any(), shopBrnachController.uploadImage);


//shop service api
router.post('/shop/createService', auth, add_shop_service_validate(), validateService, serviceController.createShopService);
router.get('/service/:id', auth, serviceController.getShopAllService);
// router.get('/service/:id',auth, serviceController.findOneShopService);
router.put('/service/:id', auth, serviceController.editShopService);
router.delete('/service/:id', auth, serviceController.deleteShopService);




router.get('/plans',auth,plansController.getAllPlans);






module.exports = router;