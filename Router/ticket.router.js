const express = require('express');
const router = express.Router();
const ticketController = require('../controller/ticket.controller'); 


router.get('/',ticketController.getAllTickets);
router.put('/:id', ticketController.updateTicketStatus);


module.exports = router;