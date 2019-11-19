const usersService = require('../services/users');

module.exports = userData =>
  usersService.findByEmail(userData.email).then(foundUser => {
    if (foundUser) {
      return usersService.updateUser(foundUser, { isAdmin: true });
    }

    userData.isAdmin = true;
    return usersService.signUp(userData);
  });
