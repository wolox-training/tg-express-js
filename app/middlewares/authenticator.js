const jwt = require('jsonwebtoken');
const config = require('../../config');
const errors = require('../errors');
const logger = require('../logger');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return next(errors.unauthenticatedUserError('You need to sign in to access this resource'));
  }
  const token = req.headers.authorization.slice(7);
  return jwt.verify(token, config.common.session.secret, (err, decode) => {
    if (err) {
      return next(errors.unauthenticatedUserError(err));
    }
    logger.info(`Authenticated! Decoded value: ${decode.payload}`);
    req.decodedValue = decode.payload;
    return next();
  });
};
