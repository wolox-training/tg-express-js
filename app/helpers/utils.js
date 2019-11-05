const bcrypt = require('bcrypt');
const errors = require('../errors');

const HASH_SALT = 10;

const hash = str =>
  bcrypt.hash(str, HASH_SALT).catch(error => {
    throw errors.hashError(error);
  });

const isEmailValid = email => {
  const wolox_email_regex = /@wolox.com/;
  return wolox_email_regex.test(email);
};

const isPasswordValid = password => {
  const alphanumeric_regex = /^[a-z0-9]+$/i;
  return alphanumeric_regex.test(password) && password.length >= 8;
};

module.exports = {
  hash,
  isEmailValid,
  isPasswordValid
};
