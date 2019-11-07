const errors = require('../../errors');
const usersService = require('../../services/users');

module.exports = (req, res, next) => {
  const { user } = req.body;
  const { email } = user;

  usersService
    .findByEmail(email)
    .then(foundUser => {
      if (foundUser) {
        throw errors.userExistsError('User already exists');
      }
      next();
    })
    .catch(next);
};
