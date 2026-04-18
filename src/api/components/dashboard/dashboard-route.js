const express = require('express');
const controller = require('./dashboard-controller');
const { authMiddleware, roleChecker } = require('../../middlewares');

module.exports = (app) => {
  const route = express.Router();
  app.use('/dashboard', route);

  route.use(authMiddleware);
  route.use(roleChecker('staff', 'admin'));

  route.get('/stats', controller.stats);
};
