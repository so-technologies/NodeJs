const configDatabase = require('./database');

config = {
  port: '3000',
  dbUri: 'mongodb://localhost/mytestapp',
  jwtSecret: 'myjwtsecret'
};

config.db = configDatabase(config.dbUri); 

module.exports = config;