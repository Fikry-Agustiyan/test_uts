const { History } = require('../../../models');

async function findByTicket(ticketId) {
  return History.find({ ticketId })
    .populate('changedBy', 'full_name email role')
    .sort({ createdAt: 1 });
}

module.exports = { findByTicket };
