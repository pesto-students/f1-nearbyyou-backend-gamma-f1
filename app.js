//import Libriry
const express = require('express');
const cors = require("cors");
const path = require('path');
const connectDB = require('./config/db');
connectDB();

const task = require('./middleware/cornJob/ticketCorn')

// var express = require('express')
var bodyParser = require('body-parser');

var app = express()

// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true })); 
app.use(cors());
// app.use(express.urlencoded({ limit: '1000mb', extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//for payment
const shortid = require('shortid')
const Razorpay = require('razorpay')
// const bodyParser = require('body-parser')
// app.use(bodyParser.json())

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/*+json' }))
// app.use(bodyParser.urlencoded({ extended: true  }));
// app.use(bodyParser.json())
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
// app.use(express.json({​​​​​​limit: '50mb', extended: true}​​​​​​));
// app.use(express.urlencoded({​​​​​​limit: "50mb", extended: true, parameterLimit:50000}​​​​​​));
// console.log("lmit :- ", limit);

// app.use(express.urlencoded({
//     limit: "500mb",
//     extended: true
//   }));
//   app.use(express.json({limit: "500mb", extended: true}));
// app.use(bodyParser.json({ limit: "1000000mb" }))
// app.use(express.json({limit: '50mb', extended: true}));
// app.use(express.urlencoded({limit: '50mb', extended: true}));
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


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
        console.log("JSON.stringify(req.body, null, 4) :- ", JSON.stringify(req.body, null, 4));
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
