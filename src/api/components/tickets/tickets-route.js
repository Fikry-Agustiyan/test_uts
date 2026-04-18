const express = require('express');
const controller = require('./tickets-controller');
const { authMiddleware, roleChecker } = require('../../middlewares');

module.exports = (app) => {
  const route = express.Router();

  app.use('/tickets', route);

  // All ticket routes require authentication
  route.use(authMiddleware);

  route.post('/', controller.create);
  route.get('/', controller.list);
  route.get('/:id', controller.detail);
  route.patch('/:id', controller.update);
  route.delete('/:id', roleChecker('user', 'admin'), controller.remove);
};
