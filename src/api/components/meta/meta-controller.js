async function enums(request, response, next) {
  try {
    return response.status(200).json({
      success: true,
      data: {
        category: ['network', 'hardware', 'software', 'facility'],
        status: ['open', 'in_progress', 'waiting_user', 'resolved', 'closed'],
        priority: ['low', 'medium', 'high'],
        role: ['user', 'staff', 'admin'],
      },
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { enums };
