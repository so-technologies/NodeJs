const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = (req, res, next) => {
  let decoded;
  const token = req.headers['authorization']; 

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