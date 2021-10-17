//import Libriry
const express = require('express');
const cors = require("cors");
const path = require('path');
const connectDB = require('./config/db');
connectDB();


//Create Object
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//for payment
const shortid = require('shortid')
const Razorpay = require('razorpay')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const razorpay = new Razorpay({
	key_id: 'rzp_test_LeuHX4bMmraCPA',
	key_secret: 'A2By3sWiWoUoLScKq5Z2h2y4'
})


//Define routes 
app.use('/api/user', require('./Router/index'))
app.use('/api/customer', require('./Router/customer.routes'));
app.use('/api/admin', require('./Router/admin.routes'));
app.use("/api/vendor", require('./Router/vendor.routes'));
app.use("/api/ticket", require('./Router/ticket.router'));

app.post('/verification', (req, res) => {
	// do a validation
	const secret = 'NearByYou'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit');
        console.log("SuccessResponse :- ", req.body);
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

app.post('/api/razorpay', async (req, res) => {
    const payment_capture = 1
    const amount = 500
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


const PORT = process.env.PORT || 3003;


// Start the server @ port
app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
});
