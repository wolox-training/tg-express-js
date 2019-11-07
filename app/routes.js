const swaggerUi = require('swagger-ui-express');
const { healthCheck } = require('./controllers/healthCheck');
const albumsController = require('./controllers/albums');
const usersController = require('./controllers/users');
const documentation = require('../documentation');
const signUp = require('./middlewares/sign_up');

exports.init = app => {
  app.get('/health', healthCheck);
  app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(documentation));

  app.get('/albums', albumsController.listAlbums);
  app.get('/albums/:id/photos', albumsController.listAlbumPhotos);

  app.post(
    '/users',
    [signUp.validateEmail, signUp.checkUserExists, signUp.validatePassword, signUp.hashPassword],
    usersController.signUp
  );
};
