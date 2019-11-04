const isEmailValid = require('../helpers/is-email-valid');
const isPasswordValid = require('../helpers/is-password-valid');
const usersService = require('../services/users');
const errors = require('../errors');
const userSignUpResponse = require('../serializers/user-sign-up-response');
const userSignUpRequest = require('../serializers/user-sign-up-request');

module.exports = user => {
  const parsedUser = userSignUpRequest(user);

  if (!isEmailValid(parsedUser.email)) {
    throw errors.invalidEmailError('Invalid email');
  }

  if (!isPasswordValid(parsedUser.password)) {
    throw errors.invalidPasswordError(
      'Password must be alphanumeric and have a length of 8 or more characters'
    );
  }

  return usersService.findByEmail(parsedUser.email).then(foundUser => {
    if (foundUser) {
      throw errors.userExistsError('User already exists');
    }

    return usersService.signUp(parsedUser).then(userSignUpResponse);
  });
};
