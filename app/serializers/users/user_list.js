module.exports = users => ({
  users: users.map(user => ({
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email
  }))
});
