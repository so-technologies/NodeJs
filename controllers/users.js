const express = require('express');
const config = require('../config');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const auth = require('../helpers/auth');

const router = express.Router();

router.use(auth);

const getAllUsers = (req, res) => {
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const limit = config.limit;

  const options = {
    page, 
    limit,
  };

  User.list(options).then((users) => {
    res.json(users);
  });
};

const getUser = (req, res) => {
  User.get(req.params.id).then((user) => {
    res.json(user);
  });
};

router.get('/', getAllUsers);
router.get('/:id', getUser);

module.exports = router;