const express = require('express');
const controller = require('./comments-controller');
const { authMiddleware } = require('../../middlewares');

module.exports = (app) => {
  const route = express.Router({ mergeParams: true });

  app.use('/tickets/:ticketId/comments', route);

  route.use(authMiddleware);

  route.post('/', controller.add);
  route.get('/', controller.list);
  route.delete('/:commentId', controller.remove);
};
