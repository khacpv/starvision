const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
  config.development.name,
  config.development.username,
  config.development.password,
  {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    host: config.development.host,
    dialect: config.development.dialect,
  },
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync();

module.exports = db;