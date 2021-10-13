const User = require('../Schema/User');
const Vendor = require('../Schema/Vendor');
const Ticket = require('../Schema/Ticket');
const vendorshop = require('../Schema/ShopBranch');
const Customer = require('../Schema/Customer');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.getTicket = async (req, res) => {
	console.log("req headers hitting-->", req.query)
	const { id } = req.query;
	try {
		const ticketdetails = await Ticket.findById(id);
		if (!ticketdetails) {
			res.json({
				status: "failure",
				message: "Ticket not found",
				payload: {
					error: "Ticket not found"
				}
			});
		}
		// console.log("ticket details are-->", ticketdetails)
		const ticket_customer_details = await Customer.aggregate(
			[
				{
					'$match': {
						'_id': ticketdetails.ticket_owner
					}
				},
				{
					'$lookup': {
						'from': 'users',
						'localField': 'user_id',
						'foreignField': '_id',
						'as': 'customeranduser'
					}
				}
			]
		)
		const completeticketdeatils = { ticketdetails, ticket_customer_details }
		console.log("ticket details with customer details-->", ticket_customer_details, ticketdetails)
		res.json({
			status: "success",
			message: "Details found",
			payload: {
				data: completeticketdeatils
			}
		})
	}
	catch (error) {
		res.json({
			status: "failure",
			message: "server error",
			payload: {
				error: "server error"
			}
		});
	}
	// try {
	// 	const ticket = await Ticket.findById(req.params.id);

	// 	if (!ticket) {
	// 		res.json({
	// 			status: "failure",
	// 			message: "Ticket not found",
	// 			payload: {
	// 				error: "ticket is not found"
	// 			}
	// 		});
	// 	}
	// 	const ticketCustomer = await Customer.findById(ticket.ticket_owner);






	// 	///check the orm here 

	// 	console.log(ticketCustomer.user_name)
	// 	if (!ticketCustomer) {
	// 		res.json({
	// 			status: "failure",
	// 			message: "Customer for the ticket not found",
	// 			payload: {
	// 				error: "this is an error"
	// 			}
	// 		});
	// 	}

	// 	const customer_reference_user = await User.findById(ticketCustomer.user_type)
	// 	console.log(ticket_owner_name)
	// 	if (!ticket_owner_name) {
	// 		res.json({
	// 			status: "failure",
	// 			message: "Customer for the ticket not found",
	// 			payload: {
	// 				error: "this is an error"
	// 			}
	// 		});
	// 	}
	// 	const ticket_details = {}

	// 	res.json({
	// 		status: "success",
	// 		message: "tickets found based on status",
	// 		payload: {
	// 			data: ticket_details
	// 		}
	// 	});
	// } catch (error) {
	// 	console.error(err.message);
	// 	res.json({
	// 		status: "failure",
	// 		message: "server error",
	// 		payload: {
	// 			error: "server error"
	// 		}
	// 	});
	// }
}


exports.getAllTickets = async (req, res) => {
	console.log("user id in tickets is -->", req.user_id);
	const vendor_details = await Vendor.find({ user_id: req.user_id });
	const vendor_id = vendor_details[0]._id;
	const { status, shop_pincode } = req.query;
	console.log("status and pincode is ->", status, typeof (shop_pincode), shop_pincode);
	console.log("vendor id is -->", vendor_id);
	try {
		const shop_details = await vendorshop.aggregate([
			{
				'$match': {
					'$and': [
						{
							'shop_pincode': parseInt(shop_pincode)
						},
						{
							'shop_owner': vendor_id
						}
					]
				}
			},
		])
		const ticketdetails = await Ticket.aggregate([
			{
				'$match': {
					'$and': [
						{
							'shop_ticket': shop_details[0]._id
						},
						{
							'ticket_status': status
						}
					]
				}
			},
			// {
			// 	'$lookup': {
			// 		'from': 'customers',
			// 		'localField': 'ticket_owner',
			// 		'foreignField': '_id',
			// 		'as': 'customerdeatils',
			// 	},
			// }
		])
		if (!ticketdetails) {
			res.json({
				status: "failure",
				message: "Ticket not found",
				payload: {
					error: "ticket is not found"
				}
			});
		}
		console.log("in all tickets-->", ticketdetails)
		res.json({
			status: "success",
			message: "tickets found based on status",
			payload: {
				data: ticketdetails
			}
		});

	}
	catch (error) {
		res.json({
			status: "failure",
			message: "server error",
			payload: {
				error: "server error"
			}
		});
	}

}

exports.updateTicketStatus = async (req, res, next) => {

	console.log("hitting update ticket api-->", req.body)

	const { status, hold_date, hold_time, hold_description, id } = req.body;
	console.log("after showing body -->", status, hold_date, hold_time, hold_description, id)
	try {
		const update_details ={}
		if(status) update_details.ticket_status = status;
		if(hold_date) update_details.hold_date = hold_date;
		if(hold_time) update_details.hold_time = hold_time;
		if(hold_description) update_details.hold_description = hold_description;

		let ticket_details = await Ticket.findById(id);
		if (!ticket_details) {
			res.json({
				status: "failure",
				message: "Ticket not found",
				payload: {
					error: "Ticket not found"
				}
			});
		}
		console.log(ticket_details.ticket_owner)

		updated_ticket = await Ticket.findByIdAndUpdate(id, { $set: update_details }, { new: true })
		console.log(updated_ticket);
		res.json({
			status: "success",
			message: "status of the ticket has been updated successfully",
			payload: {
				data: updated_ticket
			}
		});
	} catch (error) {
		console.error(error);
		res.json({
			status: "failure",
			message: "server error",
			payload: {
				error: "server error"
			}
		});
	}
}












//aggregation to find all deatils of customer

// [
//   {
//     '$lookup': {
//       'from': 'tickets', 
//       'localField': '_id', 
//       'foreignField': 'ticket_owner', 
//       'as': 'customerticketdeatails'
//     }
//   }, {
//     '$lookup': {
//       'from': 'users', 
//       'localField': 'user_id', 
//       'foreignField': '_id', 
//       'as': 'userdetails'
//     }
//   }
// ]

