const signUpResponse = user => ({
  user: {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  }
});

const signUpRequest = user => ({
  email: user.email,
  password: user.password,
  firstName: user.first_name,
  lastName: user.last_name
});

const signInRequest = user => ({
  email: user.email,
  password: user.password
});

const userList = ({ count, rows }, page) => ({
  users: rows.map(user => ({
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email
  })),
  total_count: count,
  page,
  count: rows.length
});

module.exports = {
  signInRequest,
  signUpRequest,
  signUpResponse,
  userList
};
