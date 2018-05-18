const express = require('express');
const config = require('../config');
const Article = require('../models/article');
const auth = require('../helpers/auth');
const router = express.Router();

router.use(auth);

const getAllArticles = ((req, res) => { 
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const limit = config.limit;

  const options = {
    page: page,
    limit: limit,
  };

  Article.list(options).then((articles) => {
    res.json(articles);
  });
});

router.get('/', getAllArticles);

module.exports = router;