const { Users } = require('../../../models');
// const logger = require('../../../core/logger')('app');

async function getUsers() {
  // logger.info('Eksekusi query DB: getUsers');
  return Users.find({});
}

async function getUser(_id) {
  // logger.info(`Eksekusi query DB: getUser (${_id})`);
  return Users.findById(_id);
}

async function getUserByEmail(email) {
  // logger.info(`Eksekusi query DB: getUserByEmail (${email})`);
  return Users.findOne({ email });
}

async function createUser(email, password, fullName) {
  // logger.info('Eksekusi query DB: createUser');
  // Perbaikan: Mapping parameter fungsi fullName ke field database full_name
  return Users.create({ email, password, full_name: fullName });
}

async function updateUser(_id, email, fullName) {
  // logger.info(`Eksekusi query DB: updateUser (${_id})`);
  // Perbaikan: Mapping fullName ke full_name
  return Users.updateOne({ _id }, { $set: { email, full_name: fullName } });
}

async function changePassword(_id, password) {
  // logger.info(`Eksekusi query DB: changePassword (${_id})`);
  return Users.updateOne({ _id }, { $set: { password } });
}

async function deleteUser(_id) {
  // logger.info(`Eksekusi query DB: deleteUser (${_id})`);
  return Users.deleteOne({ _id });
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
