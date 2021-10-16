const Vendor = require('../Schema/Vendor');
const service = require('../Schema/Service');
const shopbrnach = require('../Schema/ShopBranch');



//create shop 
exports.createShopService = async (req, res, next) => {
	const { service_name, service_description, shop_id } = req.body;
	try {
		console.log("inside create service api->", service_name, service_description, shop_id)

		// const shop = await shopbrnach.find({ shop_email: shop_email });


		// console.log("shop id -->", shop[0]._id);

		const newShopService = { name: service_name, service_description: service_description, service_owner: shop_id }
		const newService = new service(newShopService);
		await newService.save()
			.then(
				data => {
					res.json({
						status: "success",
						message: "added a service",
						payload: {
							data: data,
						}
					});
					console.log("added a service");
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
				error: error.message
			}
		});
		console.log(error)
	}
}


//edit sservice details
exports.editShopService = async (req, res, next) => {

	try {
		let serviceDetails = await service.findById(req.params.id);
		if (!serviceDetails) {
			res.json({
				status: "failure",
				message: "service not found",
				payload: {
					error: "service not found"
				}
			});
		}
		await service.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
			.then(data => {
				console.log(data);
				res.json({
					status: "success",
					message: "updated the service details",
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
						error: "server error"
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

//delete service
exports.deleteShopService = async (req, res) => {
	try {
		const shopservice = await service.findById(req.params.id);
		if (!shopservice) {
			res.json({
				status: "failure",
				message: "Service not found",
				payload: {
					error: "Service not found"
				}
			});
		}

		await service.findByIdAndRemove(req.params.id)
			.then(data => {
				res.json({
					status: "success",
					message: "service removed"
				});
				console.log("service deleted")
			})
			.catch(error => {
				res.json({
					status: "failure",
					message: "server error",
					payload: {
						error: "server error"
					}
				});
			})


	} catch (err) {

		console.error(err.message);
		res.json({
			status: "failure",
			message: "server error",
			payload: {
				error: err.message
			}
		});
	}
}

//find all service of shop 
exports.getShopAllService = async (req, res) => {
	console.log(" all service is called")
	console.log("params id->",req.params.id)
	try {
		await service.find({ service_owner: req.params.id })
			.then(data => {
				console.log(data)
				res.json({
					status: "success",
					message: "found all services for a branch",
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
						error: error
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


//find shop 
exports.findOneShopService = async (req, res) => {
	try {
		await service.findById(req.params.id)
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

