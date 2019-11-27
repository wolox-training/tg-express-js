const usersService = require('../services/users');
const serializers = require('../serializers/users');
const signInInteractor = require('../interactors/sign_in');
const albumsService = require('../services/albums');
const mailer = require('../helpers/mailer');
const logger = require('../logger');

const signUpEmailOptions = user => ({
  from: 'notifications@tagexpressjs.com',
  to: user.email,
  subject: 'Welcome to your new account!',
  text: `Hi ${user.firstName}, welcome to your account!`
});

const signUpEmailHandler = (error, info) => {
  if (error) {
    logger.error('Error sending email');
  } else {
    logger.info(`Email sent: ${info.response}`);
  }
};

const signUp = (req, res, next) => {
  const { user } = req.body;
  return usersService
    .signUp(serializers.signUpRequest(user))
    .then(createdUser => {
      mailer.sendMail(signUpEmailOptions(createdUser), signUpEmailHandler);
      return res.send(serializers.signUpResponse(createdUser));
    })
    .catch(next);
};

const signIn = (req, res, next) => {
  const { user } = req.body;
  return signInInteractor(serializers.signInRequest(user))
    .then(response => res.send(response))
    .catch(next);
};

const listAllUsers = (req, res, next) => {
  const { page, limit } = req.query;
  return usersService
    .listAllUsers(page, limit)
    .then(users => res.send(serializers.userList(users, page)))
    .catch(next);
};

const getUserAlbums = (req, res, next) => {
  const userId = req.params.id;
  return albumsService
    .findAlbumsForUser(userId)
    .then(userAlbums => res.send(serializers.userAlbums(userAlbums)))
    .catch(next);
};

const invalidateAllSessions = (req, res, next) => {
  const user = req.decodedValue;
  return usersService
    .invalidateAllSessions(user)
    .then(result => res.send(result))
    .catch(next);
};

module.exports = {
  signUp,
  signIn,
  listAllUsers,
  getUserAlbums,
  invalidateAllSessions
};
