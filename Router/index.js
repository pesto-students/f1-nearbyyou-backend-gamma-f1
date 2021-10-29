var express = require('express');
var router = express.Router();
var { groceryDataSchema, loginSchema } = require("../Schema");
const jwt = require('jsonwebtoken')
const userController = require('../controller/user.controller'); 


//Register
router.post('/register', function (req, res) {
    let params = req.body.params;
    console.log("req.body :- ", params);
    res.send({ status: 'Success', msg: 'Register Successfully, Please Login' })
});

//Login
// router.post('/login', function (req, res) {
//     let params = req.body.params;
//     console.log("req.body :- ", params);
//     res.send({ status: 'Success', msg: 'Login Successfully' })
// });

router.post('/login',userController.login );

router.post('/glogin', userController.glogin);

//Search
router.post('/search', function (req, res) {
    let params = req.body.params;
    console.log("req.body :- ", params);
    res.send({ status: 'Success' })
});

//Categoryes List
router.post('/category', function (req, res) {
    let params = req.body.params;
    console.log("req.body :- ", params);
    res.send({ status: 'Success' })
});



//Shop List
router.post('/shop', function (req, res) {
    let params = req.body.params;
    console.log("req.body :- ", params);
    res.send({ status: 'Success' })
});



module.exports = router;
