const jwt = require('jsonwebtoken'),
  config = require('../config');

const auth = (req, res, next) => {
  let token = req.headers['authorization'],
      decoded;

  if (!token) {
      return res.status(403).json({ message: 'No Authorization Provided', status: 403});
  }

  try {
    decoded = jwt.verify(token, config.jwtSecret);
  }
  catch(e) {
    return res.status(403).json({ message: 'Bad Token', status: 403 });
  }

  req.decoded = decoded._doc;
  next();
};

module.exports = auth;