const { factory } = require('factory-girl');
const models = require('../../app/models/index');

factory.define('user', models.users, {
  firstName: factory.chance('first'),
  lastName: factory.chance('last'),
  email: factory.seq('User.email', n => `test${n}@wolox.com.ar`),
  password: factory.chance('string', { length: 8, alpha: true })
});

module.exports = { factory };
