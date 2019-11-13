const usersService = require('../services/users');
const errors = require('../errors');
const { comparePassword, createToken } = require('../helpers/utils');

module.exports = user =>
  usersService.findByEmail(user.email).then(foundUser => {
    if (!foundUser) {
      throw errors.userDoesNotExistError('User already exists');
    }

    return comparePassword(user.password, foundUser.password).then(passwordMatches => {
      if (!passwordMatches) {
        throw errors.incorrectPasswordError('Incorrect password');
      }
      return createToken(user.email);
    });
  });
