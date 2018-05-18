const express = require('express'),
  bodyParser = require('body-parser'),
  config = require('./config'),
  models = require('./models/user'),
  auth = require('./controllers/auth'),
  users = require('./controllers/users');

var app = express();

app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true }));      

app.use('/', auth);
app.use('/users', users);

app.all('*', (req, res, next) => {
  res.status(404).json('Not Found Error');
});

app.listen(config.port, () => { console.log(`Listning port ${config.port}...`); });