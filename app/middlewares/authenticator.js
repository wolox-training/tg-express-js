const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.slice(7);
  jwt.verify(token, config.common.session.secret);
  next();
};
