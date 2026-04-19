const dashboardRepository = require('./dashboard-repository');
const logger = require('../../../core/logger')('app');

async function getSummary() {
  logger.info('Menarik data agregat untuk dashboard');
  const totalUsers = await dashboardRepository.countUsers();
  const totalTickets = await dashboardRepository.countTickets();
  const totalComments = await dashboardRepository.countComments();

  return {
    users_count: totalUsers,
    tickets_count: totalTickets,
    comments_count: totalComments,
  };
}

module.exports = {
  getSummary,
};
