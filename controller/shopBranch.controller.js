const Vendor = require('../Schema/Vendor');
const vendorshop = require('../Schema/ShopBranch');
const Category = require('../Schema/Category');
const utils = require('./uplodImage')



//create shop 
exports.createShop = async (req, res, next) => {
	console.log("add shop api is called")
	console.log(req.user_id)
	const vendor_details = await Vendor.find({ user_id: req.user_id });
	console.log("vendor ID -> ", vendor_details[0]._id);
	const vendor_id = vendor_details[0]._id;
	const category_selected = await Category.find({ name: req.body.shop_category_name });
	console.log("category selected-->", category_selected)
	const category_id = category_selected[0]._id;

	try {
		const newShopDetails = { ...req.body, shop_owner: vendor_id, shop_category: category_id }
		const newShop = new vendorshop(newShopDetails);
		await newShop.save()
			.then(
				data => {
					res.json({
						status: "success",
						message: "added a branch",
						payload: {
							data: data,
						}
					});
					console.log("newShop is created");
				}
			)
			.catch(err => {
				res.json({
					status: "failure",
					message: "server error",
					payload: {
						error: err.message
					}
				});
			})
	}
	catch (error) {
		res.json({
			status: "failure",
			message: "server error",
			payload: {
				error: "there is an error in adding shop deatils"
			}
		});
	}
}


//edit shop details
exports.editShop = async (req, res, next) => {
	// const vendor_details = await Vendor.find({ user_id: req.user_id });
	// console.log("vendor ID -> ", vendor_details[0]._id);
	// const vendor_id = vendor_details[0]._id;
	try {
		let shopbrnachdetails = await vendorshop.findById(req.params.id);
		if (!shopbrnachdetails) {
			res.json({
				status: "failure",
				message: "server error",
				payload: {
					error: "shop brnach not found"
				}
			});
		}
		await vendorshop.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
			.then(data => {
				// console.log(data);
				res.json({
					status: "success",
					message: "updated the details of branch",
					payload: {
						data: data,
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

	} catch (error) {
		res.json({
			status: "failure",
			message: "server error",
			payload: {
				error: error.message
			}
		});
	}
}

//delete shop 
exports.deleteShop = async (req, res) => {
	try {
		let shop = await vendorshop.findById(req.params.id);
		if (!shop) {
			res.json({
				status: "failure",
				message: "Shop not found",
				payload: {
					error: "Shop not found"
				}
			});
		}

		shop = await vendorshop.findByIdAndRemove(req.params.id);
		res.json({
			status: "success",
			message: "shop removed"
		});
	} catch (err) {
		console.error(err.message);
		res.json({
			status: "failure",
			message: "server error",
			payload: {
				error: "server error"
			}
		});
	}
}

//find all shop 
exports.findAll = async (req, res) => {
	console.log("hitting shop all api", req.user_id);
	const vendor_details = await Vendor.find({ user_id: req.user_id });
	// console.log("vendor ID -> ", vendor_details[0]._id);
	const vendor_id = vendor_details[0]._id;

	try {
		await vendorshop.find({ shop_owner: vendor_id })
			.then(data => {
				res.json({
					status: "success",
					message: "found details of all branch",
					payload: {
						data: { data, vendor_details },
					}
				});
			})
			.catch(error => {
				console.log(error)
				res.json({
					status: "failure",
					message: "server error",
					payload: {
						error: "server error"
					}
				});
			})

	} catch (error) {
		res.json({
			status: "failure",
			message: "server error",
			payload: {
				error: "server error"
			}
		});
	}
}


//find shop 
exports.findOneShop = async (req, res) => {
	try {
		console.log(req.query)
		await vendorshop.findById(req.query.id)
			.then(data => {
				res.json({
					status: "success",
					message: "Found details of branch",
					payload: {
						data: data,
					}
				});
			})
			.catch(error => {
				res.json({
					status: "failure",
					message: "Shop not found",
					payload: {
						error: error
					}
				});
				console.log(error.message)
			})
	} catch (error) {
		res.json({
			status: "failure",
			message: "server error",
			payload: {
				error: "server error"
			}
		});
	}
}


//Upload Image
exports.uploadImage = async (req, res, next) => {
	console.log("req.bosy :- ", req.body);
	try {

		console.log("req.formdata:- ", req.files);

		const { image, fileName } = req.body;

		let imageData = req.files[0].buffer;

		console.log("imageData", req.body);

		// let buffer = new Buffer.from(imageData.split(",")[1],"base64");
		// console.log("buffer: - ", buffer);

		// const fs = require("fs");
		// Reads file in form buffer => <Buffer ff d8 ff db 00 43 00 ...
		// const buffer = fs.readFileSync("path-to-image.jpg");
		// Pipes an image with "new-path.jpg" as the name.
		// fs.writeFileSync("new-path.jpg", buffer);
		// let filename = Date.now()+"_"+fileName;

		let response = await utils.uploadImage(imageData, req.body.fileName);

		console.log("response :- ", response);

		if (response.status) {
			// conosle.log("Success :- ", response);
			res.send({
				status: 'success',
				msg: 'Profile Update Successfully!!',
				payload: {
					data: {
						data: 'Profile Edit Success',
					}
				}
			})
		} else {
			// console.log("Error :- ", response);
			res.send({
				status: 'failure',
				msg: 'Profile Update Fail!!',
				payload: {
					data: {
						data: 'Profile Upload Error',
					}
				}
			})
		}
	}
	catch (error) {
		console.log("Erro := ", error);
		res.send({
			status: 'failure',
			msg: 'Server Error',
			payload: {
				error: 'Server Error'
			}
		})
	}
}


