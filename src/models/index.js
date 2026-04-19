const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const seeder = require('./seeder');
const usersSchema = require('./users-schema');
const ticketsSchema = require('./tickets-schema');
const commentsSchema = require('./comments-schema');
const historySchema = require('./history-schema');

const connectionString = new URL(config.database.connection);
connectionString.pathname += config.database.name;

mongoose.connect(`${connectionString.toString()}`);

const db = mongoose.connection;

const models = {
  mongoose,
  Users: usersSchema(mongoose),
  Tickets: ticketsSchema(mongoose),
  Comments: commentsSchema(mongoose),
  History: historySchema(mongoose),
  seeder,
};

db.once('open', async () => {
  logger.info('Successfully connected to MongoDB');

  await seeder(models);
});

db.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});

module.exports = models;
