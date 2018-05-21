const express = require('express');
const config = require('../config');
const auth = require('../helpers/auth');
const Article = require('../models/article');
const router = express.Router();

const getAllArticles = (req, res) => { 
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const limit = config.limit;

  const options = {
    page,
    limit
  };

  Article.list(options).then((articles) => {
    res.json(articles);
  });
};

const addArticle = (req, res) => {
  const article = new Article(req.body);

  article.validate((err) => {

    if (err) {
      res.status(403).json({ success: false, message: err });
    } else {
      article.save();
      res.json({ success: true });
    }
    
  });
};

router.get('/', getAllArticles);
router.post('/', auth, addArticle);

module.exports = router;