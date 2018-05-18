const express = require('express'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  auth = require('../helpers/auth');

var router = express.Router();

router.use(auth);

var getAllUsers = ((req, res) => {
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const limit = 30;

  const options = {
    page: page,
    limit: limit,
  }

  User.list(options).then((users) => {
    res.json(users);
  });
});

var getUser = ((req, res) => {
  User.get(req.params.id).then((user) => {
    res.json(user);
  });
});

router.get('/', getAllUsers);
router.get('/:id', getUser);

module.exports = router;