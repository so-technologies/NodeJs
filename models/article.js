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
  
  add: (user) => {
    Article.create(user);
  },

  list: (options) => {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || config.limit;
    
    return Article.find(criteria)
      .populate('user', 'firstname lastname')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec(); 
  }
  
};

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;