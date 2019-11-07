const bcrypt = require('bcrypt');
const errors = require('../../errors');

const HASH_SALT = 10;

module.exports = (req, res, next) => {
  const { user } = req.body;
  const { password } = user;

  bcrypt
    .hash(password, HASH_SALT)
    .then(hashedPassword => {
      req.body.user.password = hashedPassword;
      next();
    })
    .catch(error => {
      throw errors.hashError(error);
    });
};
