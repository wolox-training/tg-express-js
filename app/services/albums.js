const rp = require('request-promise');

const base_uri = 'https://jsonplaceholder.typicode.com';

const options = {
  headers: { 'User-Agent': 'Request-Promise' },
  json: 'true'
};

const listAlbums = () => {
  options.uri = `${base_uri}/albums`;

  return rp(options)
    .then(albums => albums)
    .catch(error => error);
};

const listPhotos = () => {
  options.uri = `${base_uri}/photos`;

  return rp(options)
    .then(photos => photos)
    .catch(error => error);
};

module.exports = {
  listAlbums,
  listPhotos
};
