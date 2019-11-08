const errors = require('../errors');
const { validatePassword, validateEmail } = require('../helpers/utils');

module.exports = (req, res, next) => {
  const { email, password } = req.body.user;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  if (!isEmailValid) {
    next(errors.invalidEmailError('Invalid email'));
  }

  if (!isPasswordValid) {
    next(
      errors.invalidPasswordError('Password must be alphanumeric and have a length of 8 or more characters')
    );
  }

  next();
};
