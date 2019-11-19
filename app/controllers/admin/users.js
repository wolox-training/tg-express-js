const createAdmin = require('../../interactors/create_admin');
const { signUpRequest, signUpResponse } = require('../../serializers/users');

const create = (req, res, next) => {
  const { user } = req.body;
  return createAdmin(signUpRequest(user))
    .then(createdUser => res.send(signUpResponse(createdUser)))
    .catch(next);
};

module.exports = {
  create
};
