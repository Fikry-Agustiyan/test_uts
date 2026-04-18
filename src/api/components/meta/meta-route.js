const express = require('express');
const controller = require('./meta-controller');
const { authMiddleware } = require('../../middlewares');

module.exports = (app) => {
  const route = express.Router();
  app.use('/meta', route);

  route.use(authMiddleware);
  route.get('/enums', controller.enums);
};
