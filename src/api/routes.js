const express = require('express');

const tickets = require('./components/tickets/tickets-route');
const comments = require('./components/comments/comments-route');
const history = require('./components/history/history-route');
const meta = require('./components/meta/meta-route');
const dashboard = require('./components/dashboard/dashboard-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  tickets(app);
  comments(app);
  history(app);
  meta(app);
  dashboard(app);
  users(app);

  return app;
};
