const dashboardService = require('./dashboard-service');
// const logger = require('../../../core/logger')('app');

async function getSummary(request, response, next) {
  try {
    // logger.info('Request untuk mendapatkan summary dashboard');
    const summary = await dashboardService.getSummary();

    return response.status(200).json(summary);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getSummary,
};
