const usersService = require('../services/users');
const serializers = require('../serializers/users');
const signInInteractor = require('../interactors/sign_in');
const albumsService = require('../services/albums');

const signUp = (req, res, next) => {
  const { user } = req.body;
  return usersService
    .signUp(serializers.signUpRequest(user))
    .then(createdUser => res.send(serializers.signUpResponse(createdUser)))
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

module.exports = {
  signUp,
  signIn,
  listAllUsers,
  getUserAlbums
};
