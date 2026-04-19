const { Users } = require('../../../models');
const logger = require('../../../core/logger')('app');

async function getUsers() {
  logger.info('Eksekusi query DB: getUsers');
  return Users.find({});
}

async function getUser(id) {
  logger.info(`Eksekusi query DB: getUser (${id})`);
  return Users.findById(id);
}

async function getUserByEmail(email) {
  logger.info(`Eksekusi query DB: getUserByEmail (${email})`);
  return Users.findOne({ email });
}

async function createUser(email, password, fullName) {
  logger.info('Eksekusi query DB: createUser');
  // Perbaikan: Mapping parameter fungsi fullName ke field database full_name
  return Users.create({ email, password, full_name: fullName });
}

async function updateUser(id, email, fullName) {
  logger.info(`Eksekusi query DB: updateUser (${id})`);
  // Perbaikan: Mapping fullName ke full_name
  return Users.updateOne({ _id: id }, { $set: { email, full_name: fullName } });
}

async function changePassword(id, password) {
  logger.info(`Eksekusi query DB: changePassword (${id})`);
  return Users.updateOne({ _id: id }, { $set: { password } });
}

async function deleteUser(id) {
  logger.info(`Eksekusi query DB: deleteUser (${id})`);
  return Users.deleteOne({ _id: id });
}

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};
