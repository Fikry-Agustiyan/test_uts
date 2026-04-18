const jwt = require('jsonwebtoken');
const authRepository = require('./auth-repository');
const { passwordMatched } = require('../../../utils/password');

function generateToken(email) {
  const secretKey = 'RANDOM_STRING';
  const payload = {
    email,
    timestamp: Date.now(),
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

async function checkLogin(email, password) {
  const user = await authRepository.getUserbyEmail(email);

  const userPass = user ? user.password : '<RANDOM>';
  const loginPassed = await passwordMatched(password, userPass);

  if (loginPassed) {
    return generateToken(email);
  }
  return null;
}

module.exports = {
  checkLogin,
};
