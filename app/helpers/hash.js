const bcrypt = require('bcrypt');
const errors = require('../errors');

const SALT = 10;

module.exports = str =>
  bcrypt.hash(str, SALT).catch(error => {
    throw errors.hashError(error);
  });
