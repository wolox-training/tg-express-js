const snakeCaseKeys = require('snakecase-keys');
const albumsService = require('../services/albums');

const listAlbums = (_, res) => {
  albumsService
    .listAlbums()
    .then(albums => res.send({ albums: albums.map(snakeCaseKeys) }))
    .catch(error => error);
};

const listAlbumPhotos = (req, res) => {
  const albumId = req.params.id;
  albumsService
    .listAlbumPhotos(albumId)
    .then(albumPhotos => res.send({ album_photos: albumPhotos.map(snakeCaseKeys) }))
    .catch(error => error);
};

module.exports = {
  listAlbums,
  listAlbumPhotos
};
