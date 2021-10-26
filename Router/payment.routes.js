var express = require('express');
var router = express.Router(); 
const shortid = require('shortid')
const Plan = require('../Schema/Plan');
const Razorpay = require('razorpay')


const razorpay = new Razorpay({
	key_id: 'rzp_test_LeuHX4bMmraCPA',
	key_secret: 'A2By3sWiWoUoLScKq5Z2h2y4'
})



router.get('/', async (req, res) => {
    console.log("hitting this api")
    const plan = await Plan.findById(req.query.plan_id);
    const payment_capture = 1
    const amount = plan.plan_price;
    const currency = 'INR'

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        const response = await razorpay.orders.create(options)
        console.log("Hello :-",response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;