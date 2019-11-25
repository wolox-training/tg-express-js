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

exports.USER_EXISTS_ERROR = 'user_exists_error';
exports.userExistsError = message => internalError(message, exports.USER_EXISTS_ERROR);

exports.HASH_ERROR = 'hash_error';
exports.hashError = message => internalError(message, exports.HASH_ERROR);

exports.USER_DOES_NOT_EXIST_ERROR = 'user_does_not_exist_error';
exports.userDoesNotExistError = message => internalError(message, exports.USER_DOES_NOT_EXIST_ERROR);

exports.INCORRECT_PASSWORD_ERROR = 'incorrect_password_error';
exports.incorrectPasswordError = message => internalError(message, exports.INCORRECT_PASSWORD_ERROR);

exports.SCHEMA_ERROR = 'schema_error';
exports.schemaError = message => internalError(message, exports.SCHEMA_ERROR);

exports.UNAUTHENTICATED_USER_ERROR = 'unauthenticated_user_error';
exports.unauthenticatedUserError = message => internalError(message, exports.UNAUTHENTICATED_USER_ERROR);

exports.ALBUM_BOUGHT_BY_USER_ERROR = 'album_bought_by_user_error';
exports.albumBoughtByUserError = message => internalError(message, exports.ALBUM_BOUGHT_BY_USER_ERROR);

exports.UNAUTHORIZED_ERROR = 'unauthorized_error';
exports.unauthorized_error = message => internalError(message, exports.UNAUTHORIZED_ERROR);

exports.INVALID_SESSION_ERROR = 'invalid_session_error';
exports.invalidSessionError = message => internalError(message, exports.INVALID_SESSION_ERROR);
