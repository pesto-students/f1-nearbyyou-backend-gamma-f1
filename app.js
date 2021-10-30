//import Libriry
const express = require('express');
const cors = require("cors");
const path = require('path');
const connectDB = require('./config/db');
connectDB();


const task = require('./middleware/cornJob/ticketCorn');
const payment_validate = require('./middleware/cornJob/paymentCron')
const Payment = require('./Schema/Payment');
const vendorshop = require('./Schema/ShopBranch');







// var express = require('express')
var bodyParser = require('body-parser');

var app = express()


app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", '*');
	res.header("Access-Control-Allow-Credentials", true);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
	next();
});




// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// app.use(express.json()); 

// for parsing application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true })); 

app.use(cors({
	origin: '*',
	credentials: true,            //access-control-allow-credentials:true
	optionSuccessStatus: 200,
}));
// app.use(express.urlencoded({ limit: '1000mb', extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//for payment

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
app.use('/api/razorpay', require('./Router/payment.routes'));

app.post('/verification', async (req, res) => {
	// do a validation
	const secret = 'NearByYou'

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		const payment_status = "successful";
		const payment_date = new Date();
		const shop_id = req.body.payload.payment.entity.notes.shop_id;
		const payment_plan = req.body.payload.payment.entity.notes.plan_id;
		const payment = new Payment({ payment_status: payment_status, payment_date: payment_date, shop_id: shop_id, payment_plan: payment_plan });

		await payment.save()
			.then(payment_details = async () => {
				const details = payment_details;
				console.log("payment done and details are ===>", payment_details);
				await vendorshop.findByIdAndUpdate(shop_id, { $set: { shop_status: "active" } }, { new: true })
					.then(data => {
						res.json({
							status: "success",
							message: "Payment done and updated status",
							payload: {
								data: { data, details }
							}
						});
					})
					.catch(error => {
						res.json({
							status: "failure",
							message: "server error",
							payload: {
								error: error.message
							}
						});
					})


			})
			.catch(err => {
				console.log(err)
			})
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})




const PORT = process.env.PORT || 3003;


// Start the server @ port
app.listen(PORT, () => {
	console.log(`server started at ${PORT}`);
});
