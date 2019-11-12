const bcrypt = require('bcrypt');
const errors = require('../errors');

const hash = str => {
  const HASH_SALT = 10;
  return bcrypt.hash(str, HASH_SALT).catch(error => {
    throw errors.hashError(error);
  });
};

const comparePassword = bcrypt.compare;

module.exports = {
  hash,
  comparePassword
};
