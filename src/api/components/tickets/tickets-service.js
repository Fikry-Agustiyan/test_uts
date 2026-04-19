const ticketsRepository = require('./tickets-repository');
const logger = require('../../../core/logger')('app');

async function getTickets() {
  logger.info('Menarik semua data tiket dari repository');
  return ticketsRepository.getTickets();
}

async function getTicket(id) {
  logger.info(`Menarik data tiket spesifik (ID: ${id})`);
  return ticketsRepository.getTicket(id);
}

async function createTicket(title, description, priority, userId) {
  logger.info('Membuat tiket baru melalui repository');
  try {
    await ticketsRepository.createTicket(title, description, priority, userId);
    return true;
  } catch (error) {
    logger.error(`Gagal membuat tiket: ${error.message}`);
    return false;
  }
}

async function updateTicket(id, title, description, status, priority) {
  logger.info(`Memperbarui data tiket (ID: ${id})`);
  try {
    const result = await ticketsRepository.updateTicket(
      id,
      title,
      description,
      status,
      priority
    );
    return result.modifiedCount > 0 || result.matchedCount > 0;
  } catch (error) {
    logger.error(`Gagal memperbarui tiket (ID: ${id}): ${error.message}`);
    return false;
  }
}

async function deleteTicket(id) {
  logger.info(`Menghapus tiket dari database (ID: ${id})`);
  try {
    const result = await ticketsRepository.deleteTicket(id);
    return result.deletedCount > 0;
  } catch (error) {
    logger.error(`Gagal menghapus tiket (ID: ${id}): ${error.message}`);
    return false;
  }
}

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
