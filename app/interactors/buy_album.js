const errors = require('../errors');
const albumsService = require('../services/albums');
const userAlbumsService = require('../services/user_albums');

module.exports = async (albumId, userId) => {
  const albumBought = await userAlbumsService.albumBoughtByUser(albumId, userId);
  if (albumBought) {
    throw errors.albumBoughtByUserError(`Album ${albumId} already bought by user ${userId}`);
  }

  const albumExists = await albumsService.findById(albumId);
  if (!albumExists) {
    const albumData = await albumsService.getInfoById(albumId);
    await albumsService.createAlbum(albumData);
  }

  const userAlbumData = { userId, albumId };
  const createdUserAlbum = await userAlbumsService.create(userAlbumData);
  return createdUserAlbum;
};
