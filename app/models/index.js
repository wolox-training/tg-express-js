const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../../config');
const dbConfig = require('../../config/db')[config.environment];

const basename = path.basename(__filename);
const db = {};

const initializeSequelize = () => {
  if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database
    return new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: true
    });
  }

  return new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
};

const sequelize = initializeSequelize();

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
