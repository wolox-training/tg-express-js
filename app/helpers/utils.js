const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errors = require('../errors');
const config = require('../../config');
const { DEFAULT_PAGE, DEFAULT_LIMIT } = require('./constants');
const logger = require('../logger');

const hash = str => {
  const HASH_SALT = 10;
  return bcrypt.hash(str, HASH_SALT).catch(error => {
    throw errors.hashError(error);
  });
};

const comparePassword = bcrypt.compare;

const createToken = payload => {
  const token = jwt.sign({ payload }, config.common.session.secret, { expiresIn: '24h' });

  jwt.verify(token, config.common.session.secret, (err, decode) => {
    const expirationDate = new Date(decode.exp * 1000);
    logger.info(`Created token will expire at ${expirationDate}`);
  });

  return {
    success: true,
    message: 'Authentication successful',
    token
  };
};

const paginate = (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) => {
  const offset = (page - 1) * limit;

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
