const mongoose = require('mongoose');
  config = require('../config');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
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
  }
}, { timestamp: true });

ArticleSchema.statics = {
  list: (options) => {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || config.limit;

    this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec(); 
  }
};

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;