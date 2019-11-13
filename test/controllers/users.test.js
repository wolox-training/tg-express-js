const supertest = require('supertest');
const app = require('../../app');
const models = require('../../app/models/index');
const { factory } = require('../factory/users');

const request = supertest(app);

const userAttributes = ({ email = 'test@wolox.com.ar', password = '12345678' }) => ({
  first_name: 'First',
  last_name: 'Last',
  password,
  email
});

const createAndSignInUser = () =>
  factory.create('user', { password: '12345678' }).then(createdUser => {
    const { email } = createdUser;
    return request
      .post('/users/sessions')
      .send({ user: { email, password: '12345678' } })
      .then(response => response.token);
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
    factory.create('user').then(createdUser => {
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
    factory.create('user', { password: '12345678' }).then(createdUser => {
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
    factory.create('user', { password: '12345678' }).then(createdUser => {
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
  const limit = 10;
  const page = 0;
  const uri = `/users?page=${page}&limit=${limit}`;
  const authorization = token => `Bearer ${token}`;

  it('returns a page of users', () =>
    createAndSignInUser().then(token =>
      request
        .get(uri)
        .set('Authorization', authorization(token))
        .expect(200)
        .then(response => {
          const { users } = response.body;
          expect(users.length).toBe(limit);
          users.forEach(user => {
            expect(user).toHaveProperty('first_name');
            expect(user).toHaveProperty('last_name');
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('email');
          });
        })
    ));
});
