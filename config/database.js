var mongoose = require('mongoose');

module.exports = function configDatabase(dbUri) {
  let db;

  db = mongoose.connect(dbUri);

  mongoose.connection.on('error', () => {
    console.error.bind(console, 'connection error...');
  });

  return db;
};