const usersRepository = require('./users-repository');
const logger = require('../../../core/logger')('app');

async function getUsers() {
  logger.info('Fetching all users');
  return usersRepository.getUsers();
}

async function getUser(id) {
  logger.info(`Fetching user with ID: ${id}`);
  return usersRepository.getUser(id);
}

async function emailExists(email) {
  logger.info(`Checking if email exists: ${email}`);

  const user = await usersRepository.getUserByEmail(email);
  return !!user; // Return true if user exists, false otherwise
}

async function createUser(email, password, fullName) {
  logger.info(`Creating user with email: ${email}`);
  return usersRepository.createUser(email, password, fullName);
}

async function updateUser(id, email, fullName) {
  logger.info(`Updating user with ID: ${id}`);
  return usersRepository.updateUser(id, email, fullName);
}

async function deleteUser(id) {
  logger.info(`Deleting user with ID: ${id}`);
  return usersRepository.deleteUser(id);
}

async function changePassword(id, password) {
  logger.info(`Changing password for user with ID: ${id}`);
  try {
    await usersRepository.changePassword(id, password);
    return true;
  } catch (err) {
    logger.error('Error saat eksekusi changePassword di database:', err);
    return false;
  }
}

module.exports = {
  getUsers,
  getUser,
  emailExists,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
};
