const { getStats } = require('./dashboard-repository');

async function stats(request, response, next) {
  try {
    const data = await getStats();
    return response.status(200).json({ success: true, data });
  } catch (error) {
    return next(error);
  }
}

module.exports = { stats };
