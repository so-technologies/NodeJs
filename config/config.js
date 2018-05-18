const configDatabase = require('./database');

const config = {
  port: '3000',
  dbUri: 'mongodb://localhost/mytestapp',
  jwtSecret: 'myjwtsecret',
  limit: 30,
  db: configDatabase(config.dbUri)
};

module.exports = config;