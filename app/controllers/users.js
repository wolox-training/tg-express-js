const usersService = require('../services/users');

const userSignUpRequest = require('../serializers/user_sign_up_request');
const userSignUpResponse = require('../serializers/user_sign_up_response');
const userSignInRequest = require('../serializers/user_sign_in_request');

const signUp = (req, res, next) => {
  const { user } = req.body;
  return usersService
    .signUp(userSignUpRequest(user))
    .then(createdUser => res.send(userSignUpResponse(createdUser)))
    .catch(next);
};

const signIn = (req, res, next) => {
  const { user } = req.body;
  return usersService
    .signIn(userSignInRequest(user))
    .then(response => res.send(response))
    .catch(next);
};

module.exports = {
  signUp,
  signIn
};
