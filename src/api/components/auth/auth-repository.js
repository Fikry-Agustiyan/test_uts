const { Users } = require('../../../models');

async function getUserbyEmail(email) {
  return Users.findOne({ email });
}

module.exports = {
  getUserbyEmail,
};
