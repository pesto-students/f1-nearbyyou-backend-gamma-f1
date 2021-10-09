const User = require('../Schema/User');
const Vendor = require('../Schema/Vendor');
const Ticket = require('../Schema/Ticket');
const vendorshop = require('../Schema/ShopBranch');
const Customer = require('../Schema/Customer');

exports.getTicket = async (req, res) => {
	try {
		const ticket = await Ticket.findById(req.params.id);
		
		if (!ticket) {
			res.json({
				status: "failure",
				message: "Ticket not found",
				payload: {
					error: "ticket is not found"
				}
			});
		}
		const ticketCustomer = await Customer.findById(ticket.ticket_owner);






		///check the orm here 

		console.log(ticketCustomer.user_name)
		if (!ticketCustomer) {
			res.json({
				status: "failure",
				message: "Customer for the ticket not found",
				payload: {
					error: "this is an error"
				}
			});
		}

		const customer_reference_user = await User.findById(ticketCustomer.user_type)
		console.log(ticket_owner_name)
		if (!ticket_owner_name) {
			res.json({
				status: "failure",
				message: "Customer for the ticket not found",
				payload: {
					error: "this is an error"
				}
			});
		}
		const ticket_details = {}

		res.json({
			status: "success",
			message: "tickets found based on status",
			payload: {
				data: ticket_details
			}
		});
	} catch (error) {
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

exports.getAllTickets = async (req, res) => {
	const { status } = req.body;
	try {
		let ticket_details = await Ticket.find({ ticket_status: status });
		if (!ticket_details) {
			res.json({
				status: "failure",
				message: "Ticket not found",
				payload: {
					error: "ticket is not found"
				}
			});
		}
		res.json({
			status: "success",
			message: "tickets found based on status",
			payload: {
				data: ticket_details
			}
		});
	} catch (error) {
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

exports.updateTicketStatus = async (req, res, next) => {
	const { status, hold_date, hold_time, hold_description } = req.body;
	try {
		const update_status = {}
		if (status) update_status.ticket_status = status;
		if (hold_date) update_status.hold_date = hold_date;
		if (hold_time) update_status.hold_time = hold_time;
		if (hold_description) update_status.hold_description = hold_description;

		let ticket_details = await Ticket.findById(req.params.id);
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

		const ticketCustomer = await Customer.findById(ticket_details.ticket_owner);

		console.log(ticketCustomer)
		if (!ticketCustomer) {
			res.json({
				status: "failure",
				message: "Customer for the ticket not found",
				payload: {
					error: "this is an error"
				}
			});
		}
		updated_ticket = await Ticket.findByIdAndUpdate(req.params.id, { $set: update_status }, { new: true })
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