const express = require('express');
const ticketsController = require('./tickets-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/tickets', route);

  // Get list of tickets
  route.get('/', ticketsController.getTickets);

  // Create a new ticket
  route.post('/', ticketsController.createTicket);

  // Get ticket detail
  route.get('/:id', ticketsController.getTicket);

  // Update ticket
  route.put('/:id', ticketsController.updateTicket);

  // Delete ticket
  route.delete('/:id', ticketsController.deleteTicket);
};
