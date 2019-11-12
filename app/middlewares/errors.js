const errors = require('../errors');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.DATABASE_ERROR]: 503,
  [errors.USER_EXISTS_ERROR]: 409,
  [errors.USER_DOES_NOT_EXIST_ERROR]: 409,
  [errors.INVALID_PASSWORD_ERROR]: 422,
  [errors.INVALID_EMAIL_ERROR]: 422,
  [errors.INCORRECT_PASSWORD_ERROR]: 401,
  [errors.EXTERNAL_API_ERROR]: 500,
  [errors.HASH_ERROR]: 500,
  [errors.DEFAULT_ERROR]: 500
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
