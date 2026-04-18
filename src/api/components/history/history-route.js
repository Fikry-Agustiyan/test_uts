const express = require('express');
const controller = require('./history-controller');
const { authMiddleware } = require('../../middlewares');

module.exports = (app) => {
  const route = express.Router({ mergeParams: true });

  app.use('/tickets/:ticketId/history', route);

  route.use(authMiddleware);
  route.get('/', controller.list);
};
