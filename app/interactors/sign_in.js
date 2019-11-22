const usersService = require('../services/users');
const errors = require('../errors');
const { comparePassword, createToken } = require('../helpers/utils');
const logger = require('../logger');

module.exports = user =>
  usersService.findByEmail(user.email).then(foundUser => {
    if (!foundUser) {
      throw errors.userDoesNotExistError('User does not exist');
    }

    return comparePassword(user.password, foundUser.password).then(passwordMatches => {
      if (!passwordMatches) {
        throw errors.incorrectPasswordError('Incorrect password');
      }
      logger.info(`User signed in: ${user.email}`);

      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        isAdmin: foundUser.isAdmin
      };
      return createToken(payload);
    });
  });
