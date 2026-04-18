const { Ticket, History } = require('../../../models');

/**
 * Insert a new ticket document.
 */
async function createTicket(data) {
  return Ticket.create(data);
}

/**
 * Find tickets with optional filter, pagination, and population.
 */
async function findTickets(filter = {}, { page = 1, limit = 10 } = {}) {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Ticket.find(filter)
      .populate('submittedBy', 'full_name email')
      .populate('assignedTo', 'full_name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Ticket.countDocuments(filter),
  ]);
  return { data, total, page, limit };
}

/**
 * Find a single ticket by its ID.
 */
async function findTicketById(id) {
  return Ticket.findById(id)
    .populate('submittedBy', 'full_name email')
    .populate('assignedTo', 'full_name email');
}

/**
 * Update a ticket and return the updated document.
 */
async function updateTicket(id, updates) {
  return Ticket.findByIdAndUpdate(id, updates, { new: true });
}

/**
 * Delete a ticket by ID.
 */
async function deleteTicket(id) {
  return Ticket.findByIdAndDelete(id);
}

/**
 * Insert a history log entry for a ticket change.
 */
async function insertHistory(ticketId, changedBy, changes, note = '') {
  return History.create({ ticketId, changedBy, changes, note });
}

module.exports = {
  createTicket,
  findTickets,
  findTicketById,
  updateTicket,
  deleteTicket,
  insertHistory,
};
