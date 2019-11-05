const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.EXTERNAL_API_ERROR = 'external_api_error';
exports.externalApiError = message => internalError(message, exports.EXTERNAL_API_ERROR);

exports.INVALID_EMAIL_ERROR = 'invalid_email_error';
exports.invalidEmailError = message => internalError(message, exports.INVALID_EMAIL_ERROR);

exports.INVALID_PASSWORD_ERROR = 'invalid_password_error';
exports.invalidPasswordError = message => internalError(message, exports.INVALID_PASSWORD_ERROR);

exports.USER_EXISTS_ERROR = 'user_exists_error';
exports.userExistsError = message => internalError(message, exports.USER_EXISTS_ERROR);

exports.HASH_ERROR = 'hash_error';
exports.hashError = message => internalError(message, exports.HASH_ERROR);
