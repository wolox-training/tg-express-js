const rp = require('request-promise');
const errors = require('../errors');

const base_uri = 'https://jsonplaceholder.typicode.com';

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

const listPhotos = () => {
  options.uri = `${base_uri}/photos`;

  return rp(options).catch(() => {
    throw errors.externalApiError('Error in external API');
  });
};

module.exports = {
  listAlbums,
  listPhotos
};
