const { hash } = require('../helpers/utils');
const usersService = require('../services/users');
const logger = require('../logger');
const errors = require('../errors');

module.exports = userData =>
  usersService.findByEmail(userData.email).then(foundUser => {
    if (foundUser) {
      return foundUser
        .update({ isAdmin: true })
        .then(result => {
          logger.info(`Promoted ${foundUser.email} user to admin`);
          return result;
        })
        .catch(error => {
          throw errors.databaseError(error);
        });
    }

    return hash(userData.password).then(hashedPassword => {
      userData.password = hashedPassword;
      return usersService.createAdminUser(userData);
    });
  });
