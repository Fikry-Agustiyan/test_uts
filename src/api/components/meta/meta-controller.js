const logger = require('../../../core/logger')('app');

async function getMeta(request, response, next) {
  try {
    logger.info('Request metadata API');

    // Metadata bisa disesuaikan dengan versi package.json
    const metadata = {
      api_name: 'Ticketing System API',
      version: '1.0.0',
      description: 'API for managing tickets, users, and comments',
      status: 'Running',
      timestamp: new Date().toISOString(),
    };

    return response.status(200).json(metadata);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMeta,
};
