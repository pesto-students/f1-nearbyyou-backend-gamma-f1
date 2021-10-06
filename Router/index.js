var express = require('express');
var router = express.Router();
var { groceryDataSchema, loginSchema } = require("../Schema");
const jwt = require('jsonwebtoken')

//Demo Get Request
router.get('/demo', function (req, res) {
    res.send({ status: 'Success GET' })
});


//Demo Post Request
router.post('/demo', function (req, res) {
    console.log("req.body :- ", req.body);
    res.send({ status: 'Success post' })
});


module.exports = router;
