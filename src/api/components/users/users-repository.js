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

async function createUser(id, fullName, email, password, role) {
  return Users.create({
    _id: id, // Map custom 'id' dari input ke '_id' Mongoose
    full_name: fullName,
    email,
    password,
    role: role || 'user', // Set default role to 'user' if not provided
  });
}

async function updateUser(_id, fullName, email, role) {
  // logger.info(`Eksekusi query DB: updateUser (${_id})`);
  // Perbaikan: Mapping fullName ke full_name
  return Users.updateOne(
    { _id },
    { $set: { full_name: fullName, email, role } }
  );
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
