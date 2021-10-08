const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticket.controller'); 
const { update_ticket_validation_rules, getAllTickets,validate}= require('../middleware/ticketValidation');


router.get('/',getAllTickets(), validate, ticketController.getAllTickets);
router.put('/:id',update_ticket_validation_rules(),validate ,ticketController.updateTicketStatus);


module.exports = router;