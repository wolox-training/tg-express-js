module.exports = users => ({
  users: users.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }))
});
