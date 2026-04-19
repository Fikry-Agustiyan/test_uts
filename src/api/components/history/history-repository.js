const { History } = require('../../../models');
const logger = require('../../../core/logger')('app');

async function getTicketHistory(ticketId) {
  logger.info(`Eksekusi query DB: getTicketHistory (${ticketId})`);
  return History.find({ ticket_id: ticketId })
    .populate('user_id', 'full_name email')
    .sort({ createdAt: -1 }); // Urutkan dari yang terbaru
}

async function createHistory(ticketId, userId, action, details) {
  logger.info('Eksekusi query DB: createHistory');
  return History.create({
    ticket_id: ticketId,
    user_id: userId,
    action,
    details,
  });
}

module.exports = {
  getTicketHistory,
  createHistory,
};
