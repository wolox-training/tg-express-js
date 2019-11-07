const swaggerUi = require('swagger-ui-express');
const { healthCheck } = require('./controllers/healthCheck');
const albumsController = require('./controllers/albums');
const usersController = require('./controllers/users');
const documentation = require('../documentation');

exports.init = app => {
  app.get('/health', healthCheck);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(documentation));

  app.get('/albums', albumsController.listAlbums);
  app.get('/albums/:id/photos', albumsController.listAlbumPhotos);

  app.post('/users', usersController.signUp);
};
