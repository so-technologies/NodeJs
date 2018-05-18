const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  config = require('../config');
  SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { 
    type: String, 
    required: true, 
    default: '' 
  },
  lastname: { 
    type: String, 
    required: true,
    default: '' 
  },
  email: { 
    type: String, 
    required: true,
    lowercase: true,
    validate: function(email) {
      return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  },
  password: { 
    type: String, 
    required: true
  },
}, { timestamps: true });

UserSchema.pre('save', (next) => {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return next(err);

          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

UserSchema.statics = {

  add: (user) => {
    this.create(user);
  },

  list: (options) => {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || config.limit;

    return this.find(criteria)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  },

  get: (id) => {
    return this.findById(id)
      .exec();
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;  