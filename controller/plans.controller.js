const Plan = require('../Schema/Plan');


exports.getAllPlans = async (req, res) => {
	try {
		await Plan.find({ })
			.then(data => {
				console.log(data)
				res.json({
					status: "success",
					message: "found all plans",
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





exports.getPlansDetails = async (req, res) => {
	try {
		await Plan.find({ })
			.then(data => {
				console.log(data)
				res.json({
					status: "success",
					message: "found all plans",
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
