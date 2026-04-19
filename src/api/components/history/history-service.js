const historyRepository = require('./history-repository');
const logger = require('../../../core/logger')('app');

async function getTicketHistory(ticketId) {
  // logger.info(`Menarik data riwayat untuk tiket ID: ${ticketId}`);
  return historyRepository.getTicketHistory(ticketId);
}

async function createHistory(ticketId, userId, action, details) {
  logger.info(`Menyimpan log riwayat baru untuk tiket ID: ${ticketId}`);
  try {
    await historyRepository.createHistory(ticketId, userId, action, details);
    return true;
  } catch (error) {
    logger.error(`Gagal membuat riwayat: ${error.message}`);
    return false;
  }
}

module.exports = {
  getTicketHistory,
  createHistory,
};
