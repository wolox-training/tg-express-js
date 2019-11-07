const errors = require('../../errors');

module.exports = (req, res, next) => {
  const { user } = req.body;
  const { email } = user;

  const wolox_email_regex = /@wolox.com/;
  const isEmailValid = wolox_email_regex.test(email);

  if (!isEmailValid) {
    throw errors.invalidEmailError('Invalid email');
  }

  next();
};
