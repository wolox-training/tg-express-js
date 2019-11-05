// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const albumsController = require('./controllers/albums');
const usersController = require('./controllers/users');

exports.init = app => {
  app.get('/health', healthCheck);

  app.get('/albums', albumsController.listAlbums);
  app.get('/albums/:id/photos', albumsController.listAlbumPhotos);

  app.post('/users', usersController.signUp);
};
