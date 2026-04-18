const service = require('./comments-service');

async function add(request, response, next) {
  try {
    const { ticketId } = request.params;
    const { body } = request.body;
    const comment = await service.addComment(request.user, ticketId, body);
    return response.status(201).json({ success: true, data: comment });
  } catch (error) {
    return next(error);
  }
}

async function list(request, response, next) {
  try {
    const { ticketId } = request.params;
    const comments = await service.listComments(request.user, ticketId);
    return response.status(200).json({ success: true, data: comments });
  } catch (error) {
    return next(error);
  }
}

async function remove(request, response, next) {
  try {
    const { commentId } = request.params;
    const result = await service.removeComment(request.user, commentId);
    return response.status(200).json({ success: true, data: result });
  } catch (error) {
    return next(error);
  }
}

module.exports = { add, list, remove };
