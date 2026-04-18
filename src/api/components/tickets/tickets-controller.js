const service = require('./tickets-service');

async function create(request, response, next) {
  try {
    const { title, description, category, location } = request.body;
    const ticket = await service.createTicket(request.user, {
      title,
      description,
      category,
      location,
    });
    return response.status(201).json({ success: true, data: ticket });
  } catch (error) {
    return next(error);
  }
}

async function list(request, response, next) {
  try {
    const result = await service.listTickets(request.user, request.query);
    return response.status(200).json({ success: true, ...result });
  } catch (error) {
    return next(error);
  }
}

async function detail(request, response, next) {
  try {
    const { id } = request.params;
    const ticket = await service.getTicket(request.user, id);
    return response.status(200).json({ success: true, data: ticket });
  } catch (error) {
    return next(error);
  }
}

async function update(request, response, next) {
  try {
    const { id } = request.params;
    const ticket = await service.updateTicket(request.user, id, request.body);
    return response.status(200).json({ success: true, data: ticket });
  } catch (error) {
    return next(error);
  }
}

async function remove(request, response, next) {
  try {
    const { id } = request.params;
    const result = await service.deleteTicket(request.user, id);
    return response.status(200).json({ success: true, data: result });
  } catch (error) {
    return next(error);
  }
}

module.exports = { create, list, detail, update, remove };
