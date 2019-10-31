const rp = require('request-promise');
const errors = require('../errors');
const config = require('../../config/index');

const base_uri = config.common.api.jsonPlaceholderBaseUri;

const options = {
  headers: { 'User-Agent': 'Request-Promise' },
  json: 'true'
};

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

module.exports = {
  listAlbums,
  listAlbumPhotos
};
