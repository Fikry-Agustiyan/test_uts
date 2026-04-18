const repository = require('./comments-repository');
const ticketRepo = require('../tickets/tickets-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function addComment(user, ticketId, body) {
  const ticket = await ticketRepo.findTicketById(ticketId);

  if (!ticket) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Ticket not found.');
  }

  if (
    user.role === 'user' &&
    String(ticket.submittedBy._id) !== String(user.id)
  ) {
    throw errorResponder(errorTypes.FORBIDDEN, 'Access denied.');
  }

  if (!body || !body.trim()) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'Comment body is required.'
    );
  }

  return repository.createComment({ ticketId, author: user.id, body });
}

async function listComments(user, ticketId) {
  const ticket = await ticketRepo.findTicketById(ticketId);

  if (!ticket) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Ticket not found.');
  }

  if (
    user.role === 'user' &&
    String(ticket.submittedBy._id) !== String(user.id)
  ) {
    throw errorResponder(errorTypes.FORBIDDEN, 'Access denied.');
  }

  return repository.findByTicket(ticketId);
}

async function removeComment(user, commentId) {
  const comment = await repository.findById(commentId);

  if (!comment) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Comment not found.');
  }

  const isOwner = String(comment.author._id) === String(user.id);
  const isPrivileged = ['staff', 'admin'].includes(user.role);

  if (!isOwner && !isPrivileged) {
    throw errorResponder(errorTypes.FORBIDDEN, 'Access denied.');
  }

  await repository.deleteComment(commentId);
  return { deleted: true };
}

module.exports = { addComment, listComments, removeComment };
