const ticketsService = require('./tickets-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const logger = require('../../../core/logger')('app');

async function getTickets(request, response, next) {
  try {
    logger.info('Request untuk mendapatkan daftar tiket');
    const tickets = await ticketsService.getTickets();

    return response.status(200).json(tickets);
  } catch (error) {
    return next(error);
  }
}

async function getTicket(request, response, next) {
  try {
    logger.info(
      `Request untuk mendapatkan detail tiket dengan ID: ${request.params.id}`
    );
    const ticket = await ticketsService.getTicket(request.params.id);

    if (!ticket) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Ticket not found');
    }

    return response.status(200).json(ticket);
  } catch (error) {
    return next(error);
  }
}

async function createTicket(request, response, next) {
  try {
    logger.info('Request untuk membuat tiket baru');
    const { title, description, priority, user_id: userId } = request.body;

    if (!title || !description || !userId) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Title, description, and user_id are required'
      );
    }

    const success = await ticketsService.createTicket(
      title,
      description,
      priority,
      userId
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create ticket'
      );
    }

    return response
      .status(201)
      .json({ message: 'Ticket created successfully' });
  } catch (error) {
    return next(error);
  }
}

async function updateTicket(request, response, next) {
  try {
    logger.info(
      `Request untuk memperbarui tiket dengan ID: ${request.params.id}`
    );
    const { title, description, status, priority } = request.body;

    const ticket = await ticketsService.getTicket(request.params.id);
    if (!ticket) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Ticket not found');
    }

    const success = await ticketsService.updateTicket(
      request.params.id,
      title,
      description,
      status,
      priority
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update ticket'
      );
    }

    return response
      .status(200)
      .json({ message: 'Ticket updated successfully' });
  } catch (error) {
    return next(error);
  }
}

async function deleteTicket(request, response, next) {
  try {
    logger.info(
      `Request untuk menghapus tiket dengan ID: ${request.params.id}`
    );
    const success = await ticketsService.deleteTicket(request.params.id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete ticket'
      );
    }

    return response
      .status(200)
      .json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
