const mongoose = require('mongoose');
const config = require('../config');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true 
  },
  views_count: {
    type: Number,
    default: 0
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamp: true });

ArticleSchema.statics = {

  getAllArticles: (options) => {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || config.limit;
    
    return Article.find(criteria)
      .populate('user', 'firstname lastname')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec(); 
  },

  getArticleById: (id) => {
    return Article.findById(id)
      .populate('user', 'firstname lastname')
      .exec();
  },
  
  updateArticle: (id, updates) => {
    return Article.findByIdAndUpdate(id, updates, { new: true }).exec();
  },

  deleteArticle: (id) => {
    return Article.findByIdAndRemove(id).exec().then(() => {
      throw new Error('Test error');
    });
  },
};

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;