const User = require('../Schema/User');
const Vendor = require('../Schema/Vendor');
const Ticket = require('../Schema/Ticket');
const vendorshop = require('../Schema/ShopBranch');
const Customer = require('../Schema/Customer');


exports.createShop = async (req, res, next) => {
	const vendor_id = "615d87dba1492420b273de81";
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

exports.editShop = async (req, res, next) => {
	const vendor_id = "615d87dba1492420b273de81";
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


exports.findAll = async (req, res) => {
	const vendor_id = "615d87dba1492420b273de81";
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

