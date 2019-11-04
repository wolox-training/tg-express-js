const signUpInteractor = require('../interactors/sign-up');

const signUp = (req, res, next) => {
  const { user } = req.body;
  return signUpInteractor(user)
    .then(createdUser => res.send(createdUser))
    .catch(next);
};

module.exports = {
  signUp
};
