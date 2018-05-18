const express = require('express'),
  config = require('../config'),
  jwt = require('jsonwebtoken'),
  User = require('../models/user');

var router = express.Router();

var signIn = ((req, res) => {
  
  User.findOne({
    email: req.body.email
  }, (err, user) => {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' })
    } else if (user) {

      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        var token = jwt.sign({id: user._id}, config.jwtSecret);
        
        res.json({
          success: true,
          token: token
        });
      }

    }

  });

});

var signUp = ((req, res) => {
  
  User.findOne({
    email: req.body.email
  }, (err, user) => {

    if (err) throw err;

    if (user) {
      res.status(403).json({ success: false, message: 'User with this email address already registered.' })
    } else {

      var user = new User(req.body);

      user.validate(function(err) {
        if (err) {
          res.status(403).json({ success: false, message: err});
        } else {
          user.save();
          res.json({ 'success': true});
        }
      });

    }
  });
  
});

router.post('/signin', signIn);
router.post('/signup', signUp);

module.exports = router;