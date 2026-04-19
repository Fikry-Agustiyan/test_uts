const { Tickets } = require('../../../models');
const logger = require('../../../core/logger')('app');

async function getTickets() {
  logger.info('Eksekusi query DB: getTickets');
  return Tickets.find({}).populate('user_id', 'full_name email');
}

async function getTicket(id) {
  logger.info(`Eksekusi query DB: getTicket (${id})`);
  return Tickets.findById(id).populate('user_id', 'full_name email');
}

async function createTicket(title, description, priority, userId) {
  logger.info('Eksekusi query DB: createTicket');
  return Tickets.create({
    title,
    description,
    priority: priority || 'low',
    user_id: userId,
  });
}

async function updateTicket(id, title, description, status, priority) {
  logger.info(`Eksekusi query DB: updateTicket (${id})`);
  const updateData = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (status) updateData.status = status;
  if (priority) updateData.priority = priority;

  // PERBAIKAN: Ubah { id } menjadi { _id: id }
  return Tickets.updateOne({ _id: id }, { $set: updateData });
}

async function deleteTicket(id) {
  logger.info(`Eksekusi query DB: deleteTicket (${id})`);
  // PERBAIKAN: Ubah { id } menjadi { _id: id }
  return Tickets.deleteOne({ _id: id });
}

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
