const models = require('../models/index');
const logger = require('../logger');
const errors = require('../errors');
const { hash, paginate } = require('../helpers/utils');

const findByEmail = email =>
  models.users.findOne({ where: { email } }).catch(error => {
    throw errors.databaseError(error.message);
  });

const signUp = user =>
  findByEmail(user.email).then(foundUser => {
    if (foundUser) {
      throw errors.userExistsError('User already exists');
    }

    return hash(user.password).then(hashedPassword => {
      user.password = hashedPassword;
      return models.users
        .create(user)
        .then(createdUser => {
          logger.info(`New user created: ${createdUser.email}`);
          return createdUser;
        })
        .catch(error => {
          throw errors.databaseError(error.message);
        });
    });
  });

const listAllUsers = (page, limit) =>
  models.users.findAndCountAll({ ...paginate(page, limit) }).catch(err => {
    throw errors.databaseError(err);
  });

module.exports = {
  signUp,
  findByEmail,
  listAllUsers
};
