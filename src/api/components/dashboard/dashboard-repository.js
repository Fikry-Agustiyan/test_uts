const { Users, Tickets, Comments } = require('../../../models');
// const logger = require('../../../core/logger')('app');

async function countUsers() {
  // logger.info('Eksekusi query DB: countUsers');
  return Users.countDocuments();
}

async function countTickets() {
  // logger.info('Eksekusi query DB: countTickets');
  return Tickets.countDocuments();
}

async function countComments() {
  // logger.info('Eksekusi query DB: countComments');
  return Comments.countDocuments();
}

module.exports = {
  countUsers,
  countTickets,
  countComments,
};
