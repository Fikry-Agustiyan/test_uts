const usersRepository = require('./users-repository');
const logger = require('../../../core/logger')('app');

async function getUsers() {
  // logger.info('Menarik semua data pengguna dari repository');
  return usersRepository.getUsers();
}

async function getUser(_id) {
  // logger.info(`Menarik data pengguna spesifik (ID: ${id})`);
  return usersRepository.getUser(_id);
}

async function emailExists(email) {
  // logger.info(`Memeriksa ketersediaan email: ${email}`);
  const user = await usersRepository.getUserByEmail(email);
  return !!user;
}

async function createUser(id, fullName, email, password, role) {
  logger.info(`Membuat pengguna baru melalui repository (Email: ${email})`);
  try {
    await usersRepository.createUser(id, fullName, email, password, role);
    return true;
  } catch (error) {
    logger.error(`Gagal membuat pengguna: ${error.message}`);
    return false;
  }
}

async function updateUser(_id, fullName, email, role) {
  logger.info(`Memperbarui data pengguna (ID: ${_id})`);
  try {
    const result = await usersRepository.updateUser(_id, fullName, email, role);
    return result.modifiedCount > 0 || result.matchedCount > 0;
  } catch (error) {
    logger.error(`Gagal memperbarui pengguna (ID: ${_id}): ${error.message}`);
    return false;
  }
}

async function deleteUser(_id) {
  logger.info(`Menghapus pengguna dari database (ID: ${_id})`);
  try {
    const result = await usersRepository.deleteUser(_id);
    return result.deletedCount > 0;
  } catch (error) {
    logger.error(`Gagal menghapus pengguna (ID: ${_id}): ${error.message}`);
    return false;
  }
}

async function changePassword(_id, password) {
  logger.info(`Memperbarui password di database (ID: ${_id})`);
  try {
    const result = await usersRepository.changePassword(_id, password);
    return result.modifiedCount > 0 || result.matchedCount > 0;
  } catch (error) {
    logger.error(
      `Gagal memperbarui password pengguna (ID: ${_id}): ${error.message}`
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
