const errors = require('../errors');

module.exports = (req, res, next) => {
  const paramsId = parseInt(req.params.id);
  const tokenId = req.decodedValue.id;
  const { isAdmin } = req.decodedValue;

  if (paramsId !== tokenId && !isAdmin) {
    return next(errors.unauthorized_error('User not authorized to access this resource'));
  }

  return next();
};
