const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errors = require('../errors');
const config = require('../../config');

const DEFAULT_PAGE = 0;
const DEFAULT_LIMIT = 10;

const hash = str => {
  const HASH_SALT = 10;
  return bcrypt.hash(str, HASH_SALT).catch(error => {
    throw errors.hashError(error);
  });
};

const comparePassword = bcrypt.compare;

const createToken = payload => {
  const token = jwt.sign({ payload }, config.common.session.secret, { expiresIn: '24h' });
  return {
    success: true,
    message: 'Authentication successful',
    token
  };
};

const paginate = (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) => {
  const offset = page * limit;

  return {
    offset,
    limit
  };
};

module.exports = {
  hash,
  comparePassword,
  paginate,
  createToken
};
