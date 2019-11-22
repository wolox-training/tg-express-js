const albumsService = require('../services/albums');
const serializer = require('../serializers/albums');
const buyAlbumInteractor = require('../interactors/buy_album');

const listAlbums = (_, res, next) =>
  albumsService
    .listAlbums()
    .then(albums => res.send(serializer.albums(albums)))
    .catch(next);

const listAlbumPhotos = (req, res, next) => {
  const albumId = req.params.id;
  return albumsService
    .listAlbumPhotos(albumId)
    .then(albumPhotos => res.send(serializer.albumPhotos(albumPhotos)))
    .catch(next);
};

const buyAlbum = (req, res, next) => {
  const userId = req.decodedValue.id;
  const albumId = req.params.id;
  return buyAlbumInteractor(albumId, userId)
    .then(result => res.send(serializer.boughtAlbum(result)))
    .catch(next);
};

module.exports = {
  listAlbums,
  listAlbumPhotos,
  buyAlbum
};
