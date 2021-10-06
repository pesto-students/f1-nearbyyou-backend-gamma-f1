const User = require('../Schema/User');
const Vendor = require('../Schema/Vendor');
const Ticket = require('../Schema/Ticket');
const vendorshop = require('../Schema/ShopBranch');
const Customer = require('../Schema/Customer');



exports.getAllTickets = async (req, res) => {
	const { status } = req.body;
	try {
		let ticket_details = await Ticket.find({ticket_status: status});
		if (!ticket_details) {
			res.status(404).json({ msg: "Ticket not found" })
		}
		console.log(ticket_details);
		res.json({
			data: ticket_details,
		});
	} catch (error) {
		console.error(err.message);
		res.status(500).send("server error");
	}
}

exports.updateTicketStatus = async (req, res, next) => {
	const { status, hold_date, hold_time, hold_description } = req.body;
	try {
		console.log("status from frontend- ", status);
		const update_status = {}
		if (status) update_status.ticket_status = status;
		if (hold_date) update_status.hold_date = hold_date;
		if (hold_time) update_status.hold_time = hold_time;
		if (hold_description) update_status.hold_description = hold_description;

		let ticket_details = await Ticket.findById(req.params.id);
		if (!ticket_details) {
			res.status(404).json({ msg: "Ticket not found" })
		}
		const ticketCustomer = await Customer.findById(ticket_details.ticket_owner);
		if (!ticketCustomer) {
			res.status(404).json({ msg: "Customer for the ticket not found" })
		}
		updated_ticket = await Ticket.findByIdAndUpdate(req.params.id, { $set: update_status }, { new: true })
		res.json({
			data: updated_ticket,
		});
	} catch (error) {
		console.error(err.message);
		res.status(500).send("server error");
	}

}