const bcrypt = require('bcrypt');
const errors = require('../errors');

const validatePassword = password => {
  const alphanumeric_regex = /^[a-z0-9]+$/i;
  return alphanumeric_regex.test(password) && password.length >= 8;
};

const validateEmail = email => {
  const wolox_email_regex = /@wolox.com/;
  return wolox_email_regex.test(email);
};

const hash = str => {
  const HASH_SALT = 10;
  return bcrypt.hash(str, HASH_SALT).catch(error => {
    throw errors.hashError(error);
  });
};

module.exports = {
  hash,
  validatePassword,
  validateEmail
};
