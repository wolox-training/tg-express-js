const bcrypt = require('bcrypt');
const { factory } = require('factory-girl');
const models = require('../../app/models/index');

factory.define(
  'user',
  models.users,
  {
    firstName: factory.chance('first', { nationality: 'en' }),
    lastName: factory.chance('last', { nationality: 'en' }),
    email: factory.seq('User.email', n => `test${n}@wolox.com.ar`),
    password: factory.chance('string', { length: 8, alpha: true })
  },
  {
    afterBuild: model =>
      bcrypt.hash(model.password, 10).then(hash => {
        model.password = hash;
        return model;
      })
  }
);

module.exports = { factory };
