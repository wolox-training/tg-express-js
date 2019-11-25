const swaggerUi = require('swagger-ui-express');
const { healthCheck } = require('./controllers/healthCheck');
const albumsController = require('./controllers/albums');
const usersController = require('./controllers/users');
const documentation = require('../documentation');
const { validateSchemaAndFail } = require('./middlewares/validator');
const userSchemas = require('./schemas').user;
const authenticateUser = require('./middlewares/authenticator');
const adminUsersController = require('./controllers/admin/users');

exports.init = app => {
  app.get('/health', healthCheck);
  app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(documentation));

  app.get('/albums', albumsController.listAlbums);
  app.get('/albums/:id/photos', albumsController.listAlbumPhotos);
  app.post('/albums/:id', [authenticateUser], albumsController.buyAlbum);

  app.post('/users', [validateSchemaAndFail(userSchemas.signUp)], usersController.signUp);
  app.post('/users/sessions', [validateSchemaAndFail(userSchemas.signIn)], usersController.signIn);
  app.get(
    '/users',
    [validateSchemaAndFail(userSchemas.listAllUsers), authenticateUser],
    usersController.listAllUsers
  );

  app.post('/admin/users', [validateSchemaAndFail(userSchemas.signUp)], adminUsersController.create);
};
