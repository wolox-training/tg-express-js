const errors = require('../errors');

const validatePassword = password => {
  const alphanumeric_regex = /^[a-z0-9]+$/i;
  const isPasswordValid = alphanumeric_regex.test(password) && password.length >= 8;

  if (!isPasswordValid) {
    throw errors.invalidPasswordError(
      'Password must be alphanumeric and have a length of 8 or more characters'
    );
  }
};

const validateEmail = email => {
  const wolox_email_regex = /@wolox.com/;
  const isEmailValid = wolox_email_regex.test(email);

  if (!isEmailValid) {
    throw errors.invalidEmailError('Invalid email');
  }
};

module.exports = (req, res, next) => {
  const { email, password } = req.body.user;
  validateEmail(email);
  validatePassword(password);
  next();
};
