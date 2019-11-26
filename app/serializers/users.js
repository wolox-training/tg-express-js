const { DEFAULT_PAGE } = require('../helpers/constants');

const signUpResponse = user => ({
  user: {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
    isAdmin: user.isAdmin
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

const userList = ({ count, rows }, page = DEFAULT_PAGE) => ({
  users: rows.map(user => ({
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email
  })),
  total_count: count,
  page: Number(page),
  count: rows.length
});

const userAlbums = userAlbumsData => ({
  user_albums: userAlbumsData.map(userAlbum => ({
    album_id: userAlbum.albumId,
    title: userAlbum.title,
    created_at: userAlbum.createdAt,
    updated_at: userAlbum.updatedAt
  }))
});

module.exports = {
  signInRequest,
  signUpRequest,
  signUpResponse,
  userList,
  userAlbums
};
