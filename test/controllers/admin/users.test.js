const supertest = require('supertest');
const app = require('../../../app');
const models = require('../../../app/models/index');
const { factory } = require('../../factory/users');

const request = supertest(app);

const userAttributes = ({ email = 'test@wolox.com.ar', password = '12345678' }) => ({
  first_name: 'First',
  last_name: 'Last',
  password,
  email
});

describe('adminUsersController.create', () => {
  it('creates an admin user', () => {
    const user = userAttributes({});
    return request
      .post('/admin/users')
      .send({ user })
      .expect(200)
      .then(() =>
        models.users.findOne({ where: { email: user.email } }).then(createdUser => {
          expect(createdUser).toHaveProperty('email', user.email);
          expect(createdUser).toHaveProperty('firstName', user.first_name);
          expect(createdUser).toHaveProperty('lastName', user.last_name);
          expect(createdUser).toHaveProperty('isAdmin', true);
        })
      );
  });

  it('promotes an existing user to admin', () =>
    factory.create('user').then(createdUser => {
      const user = {
        email: createdUser.email,
        password: '12345678',
        first_name: createdUser.firstName,
        last_name: createdUser.lastName
      };

      return request
        .post('/admin/users')
        .send({ user })
        .expect(200)
        .then(response => {
          const returnedUser = response.body.user;
          expect(returnedUser).toHaveProperty('email', user.email);
          expect(returnedUser).toHaveProperty('firstName', user.first_name);
          expect(returnedUser).toHaveProperty('lastName', user.last_name);
          expect(returnedUser).toHaveProperty('isAdmin', true);
        });
    }));

  it('fails due to invalid password', () => {
    const user = userAttributes({ password: '1234567' });
    return request
      .post('/admin/users')
      .send({ user })
      .expect(422);
  });

  it('fails due to invalid email', done => {
    const user = userAttributes({ email: 'test@wolo.com.ar' });
    return request
      .post('/admin/users')
      .send({ user })
      .expect(422)
      .end(done);
  });
});
