const Vendor = require('../Schema/Vendor');
const vendorshop = require('../Schema/ShopBranch');



//create shop 
exports.createShop = async (req, res, next) => {
	const vendor_details = await Vendor.find({ user_id: req.user_id });
	console.log("vendor ID -> ", vendor_details[0]._id);
	const vendor_id = vendor_details[0]._id;

	try {
		const newShopDetails = { ...req.body, shop_owner: vendor_id }
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
						error: "there is an error in adding shop deatils"
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
				console.log(data);
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
	const vendor_details = await Vendor.find({ user_id: req.user_id });
	console.log("vendor ID -> ", vendor_details[0]._id);
	const vendor_id = vendor_details[0]._id;

	try {
		await vendorshop.find({ shop_owner: vendor_id })
			.then(data => {
				console.log(data.length)
				res.json({
					status: "success",
					message: "found details of all branch",
					payload: {
						data: data,
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
		await vendorshop.findById(req.params.id)
			.then(data => {
				res.json({
					status: "success",
					message: "found details of all branch",
					payload: {
						data: data,
					}
				});
			})
			.catch(err => {
				res.json({
					status: "failure",
					message: "Shop not found",
					payload: {
						error: "Shop not found"
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

