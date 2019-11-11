const jwt = require('jsonwebtoken');
const models = require('../models/index');
const logger = require('../logger');
const errors = require('../errors');
const { hash, comparePassword } = require('../helpers/utils');
const config = require('../../config');

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

const createToken = email => {
  const token = jwt.sign({ email }, config.common.session.secret, { expiresIn: '24h' });
  return {
    success: true,
    message: 'Authentication successful',
    token
  };
};

const signIn = user =>
  findByEmail(user.email).then(foundUser => {
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

module.exports = {
  signUp,
  signIn,
  findByEmail
};
