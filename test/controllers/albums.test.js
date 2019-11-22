const supertest = require('supertest');
const { factory } = require('factory-girl');
const bcrypt = require('bcrypt');
const app = require('../../app');
const albumsServiceMock = require('../../app/services/albums');
const { factoryAllModels } = require('../factory/factory_by_models');
const errors = require('../../app/errors');

const request = supertest(app);

jest.unmock('../../app/services/albums');

albumsServiceMock.getInfoById = jest.fn(albumId => {
  if (albumId >= 1 && albumId <= 100) {
    return new Promise(resolve => {
      resolve({
        id: albumId,
        title: 'Lorem ipsum'
      });
    });
  }
  throw errors.externalApiError('Album not found');
});

factoryAllModels();
factory.extend(
  'users',
  'woloxUser',
  { email: factory.seq('User.email', n => `test${n}@wolox.com.ar`) },
  {
    afterBuild: model =>
      bcrypt.hash(model.password, 10).then(hash => {
        model.password = hash;
        return model;
      })
  }
);

let authenticatedUser = {};
let authToken = {};

beforeEach(async () => {
  const result = await factory.create('woloxUser', { password: '12345678' }).then(createdUser => {
    const { email } = createdUser;
    return request
      .post('/users/sessions')
      .send({ user: { email, password: '12345678' } })
      .then(response => `Bearer ${response.body.token}`)
      .then(token => ({ createdUser, token }));
  });

  authToken = result.token;
  authenticatedUser = result.createdUser;
});

describe('albumsController.buyAlbum', () => {
  it("succeeds in buying an album that hasn't been bought", () =>
    request
      .post('/albums/1')
      .set('Authorization', authToken)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('user_id', authenticatedUser.id);
        expect(response.body).toHaveProperty('album_id', 1);
        expect(response.body).toHaveProperty('created_at');
        expect(response.body).toHaveProperty('updated_at');
      }));

  it('succeeds in buying an album that has been bought', () =>
    factory.create('albums').then(createdAlbum =>
      request
        .post(`/albums/${createdAlbum.id}`)
        .set('Authorization', authToken)
        .expect(200)
        .then(response => {
          expect(response.body).toHaveProperty('user_id', authenticatedUser.id);
          expect(response.body).toHaveProperty('album_id', createdAlbum.id);
          expect(response.body).toHaveProperty('created_at');
          expect(response.body).toHaveProperty('updated_at');
        })
    ));

  it('fails due to non-existing album', () =>
    request
      .post('/albums/101')
      .set('Authorization', authToken)
      .expect(404)
      .then(response => {
        expect(response.body).toHaveProperty('message', 'Album not found');
        expect(response.body).toHaveProperty('internal_code', 'external_api_error');
      }));

  it('fails due to already bought album', () =>
    request
      .post('/albums/1')
      .set('Authorization', authToken)
      .expect(200)
      .then(() =>
        request
          .post('/albums/1')
          .set('Authorization', authToken)
          .expect(409)
      ));
});
