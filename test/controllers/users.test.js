const supertest = require('supertest');
const app = require('../../app');
const models = require('../../app/models');

const request = supertest(app);

const buildUser = ({ email = 'test@wolox.com.ar', password = '12345678' }) => ({
  first_name: 'First',
  last_name: 'Last',
  password,
  email
});

describe('usersController.signUp', () => {
  it('succeeds and creates a user', done => {
    const user = buildUser({});
    request
      .post('/users')
      .send({ user })
      .expect(200)
      .end(done);

    const createdUser = models.users.findOne({ where: { email: user.email } });
    expect(createdUser).not.toBeNull();
  });

  it('fails due to invalid password', done => {
    const user = buildUser({ password: '1234567' });
    request
      .post('/users')
      .send({ user })
      .expect(422)
      .then(response => {
        expect(response.body.internal_code).toBe('invalid_password_error');
        done();
      });
  });

  it('fails due to invalid email', done => {
    const user = buildUser({ email: 'test@wolo.com.ar' });
    request
      .post('/users')
      .send({ user })
      .expect(422)
      .then(response => {
        expect(response.body.internal_code).toBe('invalid_email_error');
        done();
      });
  });

  it('fails due to already existing user', done => {
    const user = buildUser({});
    request
      .post('/users')
      .send({ user })
      .expect(200)
      .then(() => {
        request
          .post('/users')
          .send({ user })
          .expect(500)
          .then(response => {
            expect(response.body.internal_code).toBe('user_exists_error');
            done();
          });
      });
  });
});
