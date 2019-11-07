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
      .expect(422)
      .then(response => {
        expect(response.body.internal_code).toBe('invalid_password_error');
      });
  });

  it('fails due to invalid email', () => {
    const user = userAttributes({ email: 'test@wolo.com.ar' });
    return request
      .post('/users')
      .send({ user })
      .expect(422)
      .then(response => {
        expect(response.body.internal_code).toBe('invalid_email_error');
      });
  });

  it('fails due to already existing user', () =>
    factory.create('user').then(createdUser => {
      const user = {
        email: createdUser.email,
        password: createdUser.password,
        first_name: createdUser.firstName,
        last_name: createdUser.lastName
      };

      return request
        .post('/users')
        .send({ user })
        .then(response => {
          expect(response.body.internal_code).toBe('user_exists_error');
        });
    }));
});
