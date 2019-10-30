const albumsService = require('../services/albums');
const albumsSerializer = require('../serializers/albums');
const albumPhotosSerializer = require('../serializers/album_photos');

const listAlbums = (_, res) =>
  albumsService
    .listAlbums()
    .then(albums => res.send(albumsSerializer(albums)))
    .catch(error => error);

const listAlbumPhotos = (req, res) => {
  const albumId = req.params.id;
  return albumsService
    .listAlbumPhotos(albumId)
    .then(albumPhotos => res.send(albumPhotosSerializer(albumPhotos)))
    .catch(error => error);
};

module.exports = {
  listAlbums,
  listAlbumPhotos
};
