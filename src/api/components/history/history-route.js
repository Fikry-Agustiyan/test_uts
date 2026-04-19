const express = require('express');
const historyController = require('./history-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/history', route);

  // Get history logs by ticket ID
  route.get('/ticket/:ticketId', historyController.getTicketHistory);

  // Create a new history log
  route.post('/', historyController.createHistory);
};
