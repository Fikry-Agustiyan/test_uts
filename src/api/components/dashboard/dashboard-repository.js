const { Ticket } = require('../../../models');

async function getStats() {
  const [byStatus, byCategory, byPriority, total] = await Promise.all([
    Ticket.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Ticket.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
    Ticket.aggregate([{ $group: { _id: '$priority', count: { $sum: 1 } } }]),
    Ticket.countDocuments(),
  ]);

  return { total, byStatus, byCategory, byPriority };
}

module.exports = { getStats };
