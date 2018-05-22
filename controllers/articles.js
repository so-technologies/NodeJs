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

  Article.getAllArticles(options).then((articles) => {
    res.json({ articles });
  });
};

const addArticle = (req, res) => {
  const article = new Article(req.body);

  article.validate((err) => {

    if (err) {
      res.status(403).json({ success: false, message: err });
    } else {
      article.save();
      return res.json({ success: true });
    }
    
  });
};

const getArticle = (req, res) => {
  Article.getArticleById(req.params.id).then((article) => {
    return res.json({ article });
  });
};

const updateArticle = (req, res) => {
  Article.updateArticle(req.params.id, req.body).then((article) => {
    return res.json({ article });
  });
};

const deleteArticle = (req, res) => {
  Article.deleteArticle(req.params.id)
    .then(() => {
      return res.json({ success: true });
    });
};

router.get('/', getAllArticles);
router.get('/:id', getArticle);
router.post('/', auth, addArticle);
router.put('/:id', auth, updateArticle);
router.delete('/:id', auth, deleteArticle);

module.exports = router;