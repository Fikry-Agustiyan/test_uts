const { Comment } = require('../../../models');

async function createComment(data) {
  return Comment.create(data);
}

async function findByTicket(ticketId) {
  return Comment.find({ ticketId })
    .populate('author', 'full_name email role')
    .sort({ createdAt: 1 });
}

async function findById(id) {
  return Comment.findById(id).populate('author', 'full_name email role');
}

async function deleteComment(id) {
  return Comment.findByIdAndDelete(id);
}

module.exports = { createComment, findByTicket, findById, deleteComment };
