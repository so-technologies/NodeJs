const express = require('express');
const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

const signIn = (req, res) => {
  
  User.findOne({
    email: req.body.email
  }, (err, user) => {

    if (err) throw err;

    if (!user) {
      return res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      if (user.password != req.body.password) {
        return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        const token = jwt.sign({id: user._id}, config.jwtSecret);
        
        return res.json({
          success: true,
          token: token
        });
      }

    }

  });

};

const signUp = (req, res) => {
  
  User.findOne({
    email: req.body.email
  }, (err, user) => {

    if (err) throw err;

    if (user) {
      return res.status(403).json({ success: false, message: 'User with this email address already registered.' });
    } else {

      const user = new User(req.body);

      user.validate((err) => {
        if (err) {
          return res.status(403).json({ success: false, message: err});
        } else {
          user.save();
          return res.json({ success: true });
        }
      });

    }
  });
  
};

router.post('/signin', signIn);
router.post('/signup', signUp);

module.exports = router;