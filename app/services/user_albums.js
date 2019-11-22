const models = require('../models');
const errors = require('../errors');

const findUserAlbum = (albumId, userId) =>
  models.userAlbums.findOne({ where: { albumId, userId } }).catch(() => {
    throw errors.databaseError(`Error finding userAlbum for album ${albumId} and ${userId}`);
  });

const create = userAlbumData =>
  models.userAlbums.create(userAlbumData).catch(() => {
    throw errors.databaseError(`Error creating userAlbum with ${userAlbumData}`);
  });

module.exports = {
  findUserAlbum,
  create
};
