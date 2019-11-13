const usersService = require('../services/users');
const serializers = require('../serializers/users');
const signInInteractor = require('../interactors/sign_in');

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

module.exports = {
  signUp,
  signIn
};
