const mongoose = require('mongoose');

module.exports = (dbUri) => {
  const db = mongoose.connect(dbUri);

  mongoose.connection.on('error', () => {
    console.log('connection error...');
  });

  return db;
};