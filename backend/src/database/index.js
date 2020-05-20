const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Debt = require('./models/Debt');

const connection = new Sequelize(dbConfig);

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

Debt.init(connection);

module.exports = connection;
