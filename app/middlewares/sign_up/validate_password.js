const errors = require('../../errors');

module.exports = (req, res, next) => {
  const { user } = req.body;
  const { password } = user;

  const alphanumeric_regex = /^[a-z0-9]+$/i;
  const isPasswordValid = alphanumeric_regex.test(password) && password.length >= 8;

  if (!isPasswordValid) {
    throw errors.invalidPasswordError(
      'Password must be alphanumeric and have a length of 8 or more characters'
    );
  }

  next();
};
