const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
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

module.exports = router;