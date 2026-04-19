const bcrypt = require('bcrypt');
const logger = require('../core/logger')('app');

/**
 * Hash a plain text password
 * @param {string} password - The password to be hashed
 * @returns {Promise<string>}
 */
async function hashPassword(password) {
  const saltRounds = 10;

  try {
    logger.info('Proses hashing password dimulai');
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          logger.error('Terjadi kesalahan saat hashing password:', err);
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });

    return hashedPassword;
  } catch (error) {
    logger.error('Gagal melakukan hashing password:', error);
    throw error;
  }
}

/**
 * Compares a plain text password and its hashed to determine its equality
 * @param {string} password - A plain text password
 * @param {string} hashedPassword - A hashed password
 * @returns {Promise<boolean>}
 */
async function passwordMatched(password, hashedPassword) {
  logger.info('Mencocokkan plain text password dengan hash');
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
  hashPassword,
  passwordMatched,
};
