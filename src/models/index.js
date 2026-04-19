const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const ticketsSchema = require('./tickets-schema');
const commentsSchema = require('./comments-schema');
const historySchema = require('./history-schema');

mongoose.connect(`${config.database.connectionString}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

db.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});

module.exports = {
  mongoose,
  Users: usersSchema(mongoose),
  Tickets: ticketsSchema(mongoose),
  Comments: commentsSchema(mongoose),
  History: historySchema(mongoose),
};
