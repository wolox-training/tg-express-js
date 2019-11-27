const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errors = require('../errors');
const config = require('../../config').common.session;
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
  const token = jwt.sign({ payload }, config.secret, {
    expiresIn: config.expiresIn
  });

  const amountOfTime = parseInt(config.expiresIn.match(/([0-9])+/g)[0]);
  const unitOfTime = config.expiresIn.match(/[a-z]+/g)[0];

  const expirationDate = moment().add(amountOfTime, unitOfTime);
  logger.info(`Created token will expire at ${expirationDate}`);

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
