const historyService = require('./history-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
// const logger = require('../../../core/logger')('app');

async function getTicketHistory(request, response, next) {
  try {
    const { ticketId } = request.params;
    // logger.info(`Request untuk mendapatkan riwayat tiket ID: ${ticketId}`);

    const history = await historyService.getTicketHistory(ticketId);
    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

async function createHistory(request, response, next) {
  try {
    // logger.info('Request untuk mencatat riwayat baru');
    const {
      ticket_id: ticketId,
      user_id: userId,
      action,
      details,
    } = request.body;

    if (!ticketId || !userId || !action) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'ticket_id, user_id, and action are required'
      );
    }

    const success = await historyService.createHistory(
      ticketId,
      userId,
      action,
      details
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create history log'
      );
    }

    return response
      .status(201)
      .json({ message: 'History created successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTicketHistory,
  createHistory,
};
