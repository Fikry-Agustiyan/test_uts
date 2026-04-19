const express = require('express');
const dashboardController = require('./dashboard-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/dashboard', route);

  // Get overall summary data for dashboard
  route.get('/summary', dashboardController.getSummary);
};
