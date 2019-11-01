const albumsService = require('../services/albums');
const albumsSerializer = require('../serializers/albums');
const albumPhotosSerializer = require('../serializers/album-photos');

const listAlbums = (_, res, next) =>
  albumsService
    .listAlbums()
    .then(albums => res.send(albumsSerializer(albums)))
    .catch(next);

const listAlbumPhotos = (req, res, next) => {
  const albumId = req.params.id;
  return albumsService
    .listAlbumPhotos(albumId)
    .then(albumPhotos => res.send(albumPhotosSerializer(albumPhotos)))
    .catch(next);
};

module.exports = {
  listAlbums,
  listAlbumPhotos
};
