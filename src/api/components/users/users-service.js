const usersRepository = require('./users-repository');
const logger = require('../../../core/logger')('app');

async function getUsers() {
  logger.info('Menarik semua data pengguna dari repository');
  return usersRepository.getUsers();
}

async function getUser(id) {
  logger.info(`Menarik data pengguna spesifik (ID: ${id})`);
  return usersRepository.getUser(id);
}

async function emailExists(email) {
  logger.info(`Memeriksa ketersediaan email: ${email}`);
  const user = await usersRepository.getUserByEmail(email);
  return !!user;
}

async function createUser(email, password, fullName) {
  logger.info(`Membuat pengguna baru melalui repository (Email: ${email})`);
  try {
    await usersRepository.createUser(email, password, fullName);
    return true;
  } catch (error) {
    logger.error(`Gagal membuat pengguna: ${error.message}`);
    return false;
  }
}

async function updateUser(id, email, fullName) {
  logger.info(`Memperbarui data pengguna (ID: ${id})`);
  try {
    const result = await usersRepository.updateUser(id, email, fullName);
    return result.modifiedCount > 0 || result.matchedCount > 0;
  } catch (error) {
    logger.error(`Gagal memperbarui pengguna (ID: ${id}): ${error.message}`);
    return false;
  }
}

async function deleteUser(id) {
  logger.info(`Menghapus pengguna dari database (ID: ${id})`);
  try {
    const result = await usersRepository.deleteUser(id);
    return result.deletedCount > 0;
  } catch (error) {
    logger.error(`Gagal menghapus pengguna (ID: ${id}): ${error.message}`);
    return false;
  }
}

async function changePassword(id, password) {
  logger.info(`Memperbarui password di database (ID: ${id})`);
  try {
    const result = await usersRepository.changePassword(id, password);
    return result.modifiedCount > 0 || result.matchedCount > 0;
  } catch (error) {
    logger.error(
      `Gagal memperbarui password pengguna (ID: ${id}): ${error.message}`
    );
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
