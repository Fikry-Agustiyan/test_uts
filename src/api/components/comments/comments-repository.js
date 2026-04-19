const { Comments } = require('../../../models');
// const logger = require('../../../core/logger')('app');

async function getCommentsByTicket(ticketId) {
  // logger.info(`Eksekusi query DB: getCommentsByTicket (${ticketId})`);
  return Comments.find({ ticket_id: ticketId })
    .populate('user_id', 'full_name email')
    .sort({ createdAt: 1 });
}

async function getComment(id) {
  // logger.info(`Eksekusi query DB: getComment (${id})`);
  return Comments.findById(id);
}

async function createComment(ticketId, userId, content) {
  // logger.info('Eksekusi query DB: createComment');
  return Comments.create({
    ticket_id: ticketId,
    user_id: userId,
    content,
  });
}

async function updateComment(id, content) {
  // logger.info(`Eksekusi query DB: updateComment (${id})`);
  // PERBAIKAN: Ubah { id } menjadi { _id: id }
  return Comments.updateOne({ _id: id }, { $set: { content } });
}

async function deleteComment(id) {
  // logger.info(`Eksekusi query DB: deleteComment (${id})`);
  // PERBAIKAN: Ubah { id } menjadi { _id: id }
  return Comments.deleteOne({ _id: id });
}

module.exports = {
  getCommentsByTicket,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
