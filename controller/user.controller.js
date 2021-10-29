const User = require('../Schema/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Vendor = require('../Schema/Vendor');
const Customer = require('../Schema/Customer');
const { getAuth } = require('firebase-admin/auth')
const admin = require("firebase-admin");

const serviceAccount = require("../googleServiceAccountKey.json");


admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

exports.login = async (req, res, next) => {
	const { username, password } = req.body;

	console.log("Login :- ", { username, password });

	try {

		let data = await User.find({ email: username });
		console.log(data)

		// let data = await User.find({ email: username });



		if (data.length == 1) {
			const isMatch = await bcrypt.compare(password, data[0].encrypted_passord);

			if (isMatch) {
				const token = jwt.sign({ _id: data[0]._id }, process.env.JwtSecretKey, {
					expiresIn: 36000,
				})

				res.send({
					status: 'success',
					msg: 'Login Successfully',
					payload: {
						data: {
							token: token,
							status: true,
							userInfo: {
								data: data
							}
						}
					}
				})

			} else {

				res.send({
					status: 'failure',
					msg: 'Invalid Username or Password !!',
					payload: {
						error: 'Login Fail'
					}
				})
			}

		} else {

			res.send({
				status: 'failure',
				msg: 'Invalid Username or Password !!',
				payload: {
					error: 'Login Fail'
				}
			})
		}

	} catch (error) {

		res.send({
			status: 'failure',
			msg: 'Server Error',
			payload: {
				error: error.message
			}
		})

	}

}




exports.glogin = async (req, res) => {
	const { user_name, user_email, contact_number, user_role, token } = req.body;

	console.log("google Login :- ", user_name, user_email, contact_number, user_role, token);

	try {
		getAuth()
			.verifyIdToken(token)
			.then(async (decodedToken) => {
				const uid = decodedToken.uid;
				let udata =await User.find({ email: user_email });
				if (udata.length == 0) {
					const newUser = await new User({ user_name: user_name, email: user_email, user_role: user_role || "customer", contact_number: contact_number });
					newUser.save()
						.then(async (data) => {
							const user_details = data;
							if (data.user_role == "vendor") {
								const new_vendor = await new Vendor({ user_id: data._id });
								await new_vendor.save()
									.then(vendor_data => {
										res.json({
											status: "success",
											msg: "successfully registered please login",
											payload: {
												data: {
													userInfo: {
														data: user_details,
														customer_data: vendor_data
													}
												},
											}
										});
									})

							} else {
								const newCustomer = new Customer({ user_id: data._id });
								newCustomer.save()
									.then(customer_data => {
										res.json({
											status: "success",
											msg: "successfully registered please login",
											payload: {
												data: {
													userInfo: {
														data: user_details,
														customer_data: customer_data
													}
												},
											}
										});
									})
							}
						})
				} else {
					res.send({
						status: 'success',
						msg: 'Login Successfully',
						payload: {
							data: {
								userInfo: {
									data: udata,
									token: token
								}
							}
						}
					});
					console.log("successfull")
				}


			})
			.catch((error) => {
				console.log(error)
				return res.send({
					status: 'failure',
					msg: 'Please login again !!',
					payload: {
						error: error
					}
				})
			});

		// let udata = await User.find({ email: user_email });
		// console.log("in backend->", udata.length)
		// console.log("user data in google auth==>", udata)
		// if (udata.length == 0) {
		// 	const newUser = new User({ user_name: user_name, email: user_email, user_role: user_role || "customer", contact_number: contact_number });
		// 	await newUser.save()
		// 		.then(data => {
		// 			const user_details = data;
		// 			if (data.user_role == "vendor") {
		// 				const new_vendor = new Vendor({ user_id: data._id });
		// 				new_vendor.save()
		// 					.then(vendor_data => {
		// 						res.json({
		// 							status: "success",
		// 							msg: "successfully registered please login",
		// 							payload: {
		// 								data: {
		// 									userInfo: {
		// 										data: user_details,
		// 										customer_data: vendor_data
		// 									}
		// 								},
		// 							}
		// 						});
		// 					})

		// 			} else {
		// 				const newCustomer = new Customer({ user_id: data._id });
		// 				newCustomer.save()
		// 					.then(customer_data => {
		// 						res.json({
		// 							status: "success",
		// 							msg: "successfully registered please login",
		// 							payload: {
		// 								data: {
		// 									userInfo: {
		// 										data: user_details,
		// 										customer_data: customer_data
		// 									}
		// 								},
		// 							}
		// 						});
		// 					})
		// 			}
		// 		})
		// }
		// else {
		// 	res.send({
		// 		status: 'success',
		// 		msg: 'Login Successfully',
		// 		payload: {
		// 			data: {
		// 				userInfo: {
		// 					data: udata
		// 				}
		// 			}
		// 		}
		// 	});
		// 	console.log("successfull")
		// }


	} catch (error) {
		console.log(error.message)
		res.send({
			status: 'failure',
			msg: 'Server Error',
			payload: {
				error: error.message
			}
		})

	}

}


