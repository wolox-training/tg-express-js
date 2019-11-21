const models = require('../models');
const errors = require('../errors');

const albumBoughtByUser = (albumId, userId) =>
  models.userAlbums
    .findOne({ where: { albumId, userId } })
    .then(foundUser => {
      if (foundUser) {
        return true;
      }
      return false;
    })
    .catch(() => {
      throw errors.databaseError(`Error finding userAlbum for album ${albumId} and ${userId}`);
    });

const create = userAlbumData =>
  models.userAlbums.create(userAlbumData).catch(() => {
    throw errors.databaseError(`Error creating userAlbum with ${userAlbumData}`);
  });

module.exports = {
  albumBoughtByUser,
  create
};
