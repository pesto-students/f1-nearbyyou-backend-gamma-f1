const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userController = require('../controller/user.controller');
const adminController = require('../controller/admin.controller');

//Login
router.post('/login', userController.login);

//Category Listing API
router.post('/category', adminController.category);

// Add EDit Category
router.post('/addEditCategory', adminController.addEditCategory);

//Delete Category
router.post('/deleteCategory', adminController.deleteCategory);

//Change Category Status
router.post('/changeCategoryStatus', adminController.changeCategoryStatus);



//Plan Listing API
router.post('/plan', adminController.plan);

// Add EDit Plan
router.post('/addEditPlan', adminController.addEditPlan);

//Delete Plan
router.post('/deletePlan', adminController.deletePlan);

//Change Plan Status
router.post('/changePlanStatus', adminController.changePlanStatus);


//Vendor Shop List
router.post('/vendorList', adminController.vendorList);

//Accept Reject Shop Request 
router.post('/acceptRejectRequest', adminController.acceptRejectShopRequest);


module.exports = router;