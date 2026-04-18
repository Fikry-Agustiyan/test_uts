const express = require('express');
const authController = require('./auth-controller');
const { authMiddleware } = require('../../middlewares');

const router = express.Router();

module.exports = (app) => {
  app.use('/auth', router);

  router.post('/login', authController.login);

  router.get('/protected', authMiddleware, authController.testProtected);
};
