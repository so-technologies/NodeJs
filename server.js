const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const auth = require('./controllers/auth');
const users = require('./controllers/users');
const articles = require('./controllers/articles');

const app = express();

app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true }));      

app.use('/', auth);
app.use('/users', users);
app.use('/articles', articles);

app.all('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Not Found Error' });
});

app.listen(config.port, () => { console.log(`Listning port ${config.port}...`); });