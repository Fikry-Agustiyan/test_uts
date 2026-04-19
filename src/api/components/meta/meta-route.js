const express = require('express');
const metaController = require('./meta-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/meta', route);

  route.get('/', metaController.getMeta);
};
