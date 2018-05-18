const express = require('express'),
  config = require('../config'),
  Article = require('../models/article'),
  auth = require('../helpers/auth');

var router = express.Router();

router.use(auth);

var getAllArticles = ((req, res) => {
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const limit = config.limit;

  const options = {
    page: page,
    limit: limit,
  }

  Article.list(options).then((articles) => {
    res.json(articles);
  })
});

router.get('/', getAllArticles);

module.exports = router;