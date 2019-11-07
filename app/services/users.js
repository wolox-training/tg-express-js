const models = require('../models/index');
const logger = require('../logger');
const errors = require('../errors');

const signUp = user =>
  models.users
    .create(user)
    .then(createdUser => {
      logger.info(`New user created: ${createdUser.email}`);
      return createdUser;
    })
    .catch(error => {
      throw errors.databaseError(error.message);
    });

const findByEmail = email =>
  models.users.findOne({ where: { email } }).catch(error => {
    throw errors.databaseError(error.message);
  });

module.exports = {
  signUp,
  findByEmail
};
