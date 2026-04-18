const repository = require('./tickets-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

const PRIORITY_MAP = {
  network: 'high',
  hardware: 'medium',
  software: 'medium',
  facility: 'low',
};

const VALID_STATUSES = [
  'open',
  'in_progress',
  'waiting_user',
  'resolved',
  'closed',
];
const VALID_PRIORITIES = ['low', 'medium', 'high'];

/**
 * Derive priority automatically from category.
 */
function resolvePriority(category) {
  return PRIORITY_MAP[category] || 'low';
}

/**
 * Build a filter object based on caller role.
 * Regular users only see their own tickets.
 */
function buildFilter(user, extraFilter = {}) {
  const base = user.role === 'user' ? { submittedBy: user.id } : {};
  return { ...base, ...extraFilter };
}

/**
 * Create a new ticket. Priority is derived server-side; status defaults to 'open'.
 */
async function createTicket(user, { title, description, category, location }) {
  const priority = resolvePriority(category);
  const ticket = await repository.createTicket({
    title,
    description,
    category,
    location,
    priority,
    status: 'open',
    submittedBy: user.id,
  });

  await repository.insertHistory(
    ticket._id,
    user.id,
    { status: 'open', priority },
    'Ticket created.'
  );
  return ticket;
}

/**
 * List tickets with pagination. Filter is role-aware.
 */
async function listTickets(user, query = {}) {
  const { page, limit, status, category, priority } = query;
  const extra = {};
  if (status) extra.status = status;
  if (category) extra.category = category;
  if (priority) extra.priority = priority;

  const filter = buildFilter(user, extra);
  return repository.findTickets(filter, {
    page: parseInt(page, 10) || 1,
    limit: parseInt(limit, 10) || 10,
  });
}

/**
 * Get a single ticket. Users can only view their own.
 */
async function getTicket(user, ticketId) {
  const ticket = await repository.findTicketById(ticketId);

  if (!ticket) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Ticket not found.');
  }

  if (
    user.role === 'user' &&
    String(ticket.submittedBy._id) !== String(user.id)
  ) {
    throw errorResponder(errorTypes.FORBIDDEN, 'Access denied.');
  }

  return ticket;
}

/**
 * Update a ticket.
 * - Users may only update title/description/location on their own open tickets.
 * - Staff/Admin may update status, priority, assignedTo on any ticket.
 */
async function updateTicket(user, ticketId, body) {
  const ticket = await repository.findTicketById(ticketId);

  if (!ticket) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Ticket not found.');
  }

  const changes = {};

  if (user.role === 'user') {
    if (String(ticket.submittedBy._id) !== String(user.id)) {
      throw errorResponder(errorTypes.FORBIDDEN, 'Access denied.');
    }

    if (!['open', 'waiting_user'].includes(ticket.status)) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Ticket can only be edited when status is open or waiting_user.'
      );
    }

    const { title, description, location } = body;
    if (title) changes.title = title;
    if (description) changes.description = description;
    if (location) changes.location = location;
  } else {
    // staff / admin
    const { status, priority, assignedTo, title, description, location } = body;

    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        throw errorResponder(
          errorTypes.VALIDATION_ERROR,
          `Invalid status: ${status}.`
        );
      }
      changes.status = status;
    }

    if (priority) {
      if (!VALID_PRIORITIES.includes(priority)) {
        throw errorResponder(
          errorTypes.VALIDATION_ERROR,
          `Invalid priority: ${priority}.`
        );
      }
      changes.priority = priority;
    }

    if (assignedTo !== undefined) changes.assignedTo = assignedTo;
    if (title) changes.title = title;
    if (description) changes.description = description;
    if (location) changes.location = location;
  }

  if (Object.keys(changes).length === 0) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'No valid fields provided for update.'
    );
  }

  const updated = await repository.updateTicket(ticketId, changes);
  await repository.insertHistory(ticketId, user.id, changes, 'Ticket updated.');
  return updated;
}

/**
 * Delete a ticket. Users delete only their own; admin can delete any.
 */
async function deleteTicket(user, ticketId) {
  const ticket = await repository.findTicketById(ticketId);

  if (!ticket) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Ticket not found.');
  }

  if (
    user.role === 'user' &&
    String(ticket.submittedBy._id) !== String(user.id)
  ) {
    throw errorResponder(errorTypes.FORBIDDEN, 'Access denied.');
  }

  await repository.deleteTicket(ticketId);
  return { deleted: true };
}

module.exports = {
  createTicket,
  listTickets,
  getTicket,
  updateTicket,
  deleteTicket,
};
