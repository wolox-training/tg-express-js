const albumsService = require('../services/albums');

const listAlbums = (_, res) => {
  albumsService
    .listAlbums()
    .then(albums => res.send(albums))
    .catch(error => error);
};

const listAlbumPhotos = (req, res) => {
  const albumId = req.params.id;
  albumsService
    .listAlbumPhotos(albumId)
    .then(albums => res.send(albums))
    .catch(error => error);
};

module.exports = {
  listAlbums,
  listAlbumPhotos
};
