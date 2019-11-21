const rp = require('request-promise');
const errors = require('../errors');
const config = require('../../config/index');
const models = require('../models');

const base_uri = config.common.api.jsonPlaceholderBaseUri;

const options = {};

const listAlbums = () => {
  options.uri = `${base_uri}/albums`;

  return rp(options).catch(() => {
    throw errors.externalApiError('Error in external API');
  });
};

const listAlbumPhotos = albumId => {
  options.uri = `${base_uri}/albums/${albumId}/photos`;

  return rp(options).catch(() => {
    throw errors.externalApiError('Error in external API');
  });
};

const findById = albumId =>
  models.albums.findByPk(albumId).catch(() => {
    throw errors.databaseError('Album not found');
  });

const createAlbum = albumData =>
  models.albums.create(albumData).catch(() => {
    throw errors.databaseError('Could not create album');
  });

const getInfoById = albumId => {
  options.uri = `${base_uri}/albums/${albumId}`;
  return rp(options)
    .then(result => {
      const albumData = JSON.parse(result);
      delete albumData.userId;
      return albumData;
    })
    .catch(() => {
      throw errors.externalApiError('Album not found');
    });
};

module.exports = {
  listAlbums,
  listAlbumPhotos,
  findById,
  getInfoById,
  createAlbum
};
