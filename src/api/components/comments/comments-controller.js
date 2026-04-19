const commentsService = require('./comments-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const logger = require('../../../core/logger')('app');

async function getCommentsByTicket(request, response, next) {
  try {
    const { ticketId } = request.params;
    logger.info(
      `Request untuk mendapatkan komentar pada tiket ID: ${ticketId}`
    );

    const comments = await commentsService.getCommentsByTicket(ticketId);
    return response.status(200).json(comments);
  } catch (error) {
    return next(error);
  }
}

async function createComment(request, response, next) {
  try {
    logger.info('Request untuk membuat komentar baru');
    const { ticket_id: ticketId, user_id: userId, content } = request.body;

    if (!ticketId || !userId || !content) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'ticket_id, user_id, and content are required'
      );
    }

    const success = await commentsService.createComment(
      ticketId,
      userId,
      content
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create comment'
      );
    }

    return response
      .status(201)
      .json({ message: 'Comment created successfully' });
  } catch (error) {
    return next(error);
  }
}

async function updateComment(request, response, next) {
  try {
    logger.info(
      `Request untuk memperbarui komentar dengan ID: ${request.params.id}`
    );
    const { content } = request.body;

    if (!content) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Content is required');
    }

    const comment = await commentsService.getComment(request.params.id);
    if (!comment) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Comment not found'
      );
    }

    const success = await commentsService.updateComment(
      request.params.id,
      content
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update comment'
      );
    }

    return response
      .status(200)
      .json({ message: 'Comment updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteComment(request, response, next) {
  try {
    logger.info(
      `Request untuk menghapus komentar dengan ID: ${request.params.id}`
    );

    const success = await commentsService.deleteComment(request.params.id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete comment'
      );
    }

    return response
      .status(200)
      .json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getCommentsByTicket,
  createComment,
  updateComment,
  deleteComment,
};
