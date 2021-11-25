const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticket.controller'); 
const { update_ticket_validation_rules, getAllTickets,validate}= require('../middleware/ticketValidation');
const auth=require('../middleware/auth');

//add auth later
router.get('/',auth, ticketController.getAllTickets);
router.get('/:id',auth, ticketController.getTicket);
router.put('/',auth,ticketController.updateTicketStatus);
// router.delete('/:id',ticketController.deleteTicket);


module.exports = router;