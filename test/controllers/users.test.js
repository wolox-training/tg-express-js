const supertest = require('supertest');
const { factory } = require('factory-girl');
const bcrypt = require('bcrypt');
const app = require('../../app');
const models = require('../../app/models/index');
const { factoryAllModels } = require('../factory/factory_by_models');

factoryAllModels();
factory.extend(
  'users',
  'woloxUser',
  { email: factory.seq('User.email', n => `test${n}@wolox.com.ar`), password: '123456789' },
  {
    afterBuild: model =>
      bcrypt.hash(model.password, 10).then(hash => {
        model.password = hash;
        return model;
      })
  }
);

factory.extend('userAlbums', 'userAlbumAssoc', {
  userId: factory.assoc('users', 'id'),
  albumId: factory.assoc('albums', 'id')
});

const request = supertest(app);

const userAttributes = ({ email = 'test@wolox.com.ar', password = '12345678' }) => ({
  first_name: 'First',
  last_name: 'Last',
  password,
  email
});

const createAndSignInUser = options =>
  factory.create('woloxUser', { ...options, password: '12345678' }).then(createdUser => {
    const { email } = createdUser;
    return request
      .post('/users/sessions')
      .send({ user: { email, password: '12345678' } })
      .then(response => `Bearer ${response.body.token}`)
      .then(token => ({ createdUser, token }));
  });

describe('usersController.signUp', () => {
  it('succeeds and creates a user', () => {
    const user = userAttributes({});
    return request
      .post('/users')
      .send({ user })
      .expect(200)
      .then(() =>
        models.users.findOne({ where: { email: user.email } }).then(createdUser => {
          expect(createdUser).toHaveProperty('email', user.email);
          expect(createdUser).toHaveProperty('firstName', user.first_name);
          expect(createdUser).toHaveProperty('lastName', user.last_name);
        })
      );
  });

  it('fails due to invalid password', () => {
    const user = userAttributes({ password: '1234567' });
    return request
      .post('/users')
      .send({ user })
      .expect(422);
  });

  it('fails due to invalid email', () => {
    const user = userAttributes({ email: 'test@wolo.com.ar' });
    return request
      .post('/users')
      .send({ user })
      .expect(422);
  });

  it('fails due to already existing user', () =>
    factory.create('woloxUser').then(createdUser => {
      const user = {
        email: createdUser.email,
        password: '12345678',
        first_name: createdUser.firstName,
        last_name: createdUser.lastName
      };

      return request
        .post('/users')
        .send({ user })
        .expect(409)
        .then(response => {
          expect(response.body.internal_code).toBe('user_exists_error');
        });
    }));
});

describe('usersController.signIn', () => {
  it('signs in a user', () =>
    factory.create('woloxUser', { password: '12345678' }).then(createdUser => {
      const { email } = createdUser;
      return request
        .post('/users/sessions')
        .send({ user: { email, password: '12345678' } })
        .expect(200)
        .then(response => {
          expect(response.body).toHaveProperty('success', true);
          expect(response.body).toHaveProperty('message', 'Authentication successful');
          expect(response.body).toHaveProperty('token');
        });
    }));

  it('fails due to an incorrect password', () =>
    factory.create('woloxUser', { password: '12345678' }).then(createdUser => {
      const { email } = createdUser;
      return request
        .post('/users/sessions')
        .send({ user: { email, password: '123456786' } })
        .expect(401);
    }));

  it('fails due to user not existing', done => {
    const user = {
      email: 'nonexistent@wolox.com',
      password: '123456789'
    };

    return request
      .post('/users/sessions')
      .send({ user })
      .expect(409)
      .end(done);
  });
});

describe('usersController.listAllUsers', () => {
  const amountOfUsers = 15;
  const limit = 10;
  const page = 1;
  const uri = `/users?page=${page}&limit=${limit}`;

  it('returns a page of users', () =>
    factory.createMany('woloxUser', amountOfUsers).then(() =>
      createAndSignInUser().then(({ token }) =>
        request
          .get(uri)
          .set('Authorization', token)
          .expect(200)
          .then(response => {
            expect(response.body).toHaveProperty('users');
            const { users } = response.body;
            expect(response.body).toHaveProperty('count', users.length);
            expect(response.body).toHaveProperty('total_count');
            expect(response.body).toHaveProperty('page', page);
            expect(users.length).toBe(limit);
            users.forEach(user => {
              expect(user).toHaveProperty('first_name');
              expect(user).toHaveProperty('last_name');
              expect(user).toHaveProperty('id');
              expect(user).toHaveProperty('email');
            });
          })
      )
    ));

  it('returns a page of users with default params', () =>
    factory.createMany('woloxUser', amountOfUsers).then(() =>
      createAndSignInUser().then(({ token }) =>
        request
          .get('/users')
          .set('Authorization', token)
          .expect(200)
          .then(response => {
            expect(response.body).toHaveProperty('users');
            const { users } = response.body;
            expect(response.body).toHaveProperty('count', users.length);
            expect(response.body).toHaveProperty('total_count');
            expect(response.body).toHaveProperty('page', page);
            expect(users.length).toBe(limit);
            users.forEach(user => {
              expect(user).toHaveProperty('first_name');
              expect(user).toHaveProperty('last_name');
              expect(user).toHaveProperty('id');
              expect(user).toHaveProperty('email');
            });
          })
      )
    ));

  it('fails due to unauthorized access', done =>
    request
      .get(uri)
      .set('Authorization', 'Bearer asdfasdfsf')
      .expect(401)
      .end(done));
});

describe('usersController.listUserAlbums', () => {
  it('lists user albums for a non admin user', () => {
    createAndSignInUser().then(({ createdUser, token }) =>
      factory.createMany('userAlbumAssoc', 3, { userId: createdUser.id }).then(userAlbums => {
        const uri = `/users/${createdUser.id}/albums`;
        return request
          .get(uri)
          .set('Authorization', token)
          .expect(200)
          .then(response => {
            expect(response.body).toHaveProperty('user_albums');
            const responseUserAlbums = response.body.user_albums;
            expect(responseUserAlbums.length).toBe(userAlbums.length);
            return responseUserAlbums.forEach(responseUserAlbum => {
              expect(responseUserAlbum).toHaveProperty('title');
              expect(responseUserAlbum).toHaveProperty('created_at');
              expect(responseUserAlbum).toHaveProperty('updated_at');
            });
          });
      })
    );
  });

  it("lists another user's albums for an admin user", () =>
    createAndSignInUser({ isAdmin: true }).then(({ token }) =>
      factory.create('woloxUser').then(otherUser =>
        factory.createMany('userAlbumAssoc', 3, { userId: otherUser.id }).then(userAlbums => {
          const uri = `/users/${otherUser.id}/albums`;
          return request
            .get(uri)
            .set('Authorization', token)
            .expect(200)
            .then(response => {
              expect(response.body).toHaveProperty('user_albums');
              const responseUserAlbums = response.body.user_albums;
              expect(responseUserAlbums.length).toBe(userAlbums.length);
              return responseUserAlbums.forEach(responseUserAlbum => {
                expect(responseUserAlbum).toHaveProperty('title');
                expect(responseUserAlbum).toHaveProperty('created_at');
                expect(responseUserAlbum).toHaveProperty('updated_at');
              });
            });
        })
      )
    ));

  it("fails due to a non admin user requesting other user's albums", () =>
    createAndSignInUser({ isAdmin: false }).then(({ createdUser, token }) => {
      const otherUserId = createdUser.id + 1;
      const uri = `/users/${otherUserId}/albums`;
      return request
        .get(uri)
        .set('Authorization', token)
        .expect(401);
    }));
});
