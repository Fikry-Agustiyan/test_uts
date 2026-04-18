const { findByTicket } = require('./history-repository');
const ticketRepo = require('../tickets/tickets-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function list(request, response, next) {
  try {
    const { ticketId } = request.params;
    const ticket = await ticketRepo.findTicketById(ticketId);

    if (!ticket) {
      throw errorResponder(errorTypes.NOT_FOUND, 'Ticket not found.');
    }

    if (
      request.user.role === 'user' &&
      String(ticket.submittedBy._id) !== String(request.user.id)
    ) {
      throw errorResponder(errorTypes.FORBIDDEN, 'Access denied.');
    }

    const logs = await findByTicket(ticketId);
    return response.status(200).json({ success: true, data: logs });
  } catch (error) {
    return next(error);
  }
}

module.exports = { list };
