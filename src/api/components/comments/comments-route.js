const express = require('express');
const commentsController = require('./comments-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/comments', route);

  // Get comments by ticket ID
  route.get('/ticket/:ticketId', commentsController.getCommentsByTicket);

  // Create a new comment
  route.post('/', commentsController.createComment);

  // Update a comment
  route.put('/:id', commentsController.updateComment);

  // Delete a comment
  route.delete('/:id', commentsController.deleteComment);
};
