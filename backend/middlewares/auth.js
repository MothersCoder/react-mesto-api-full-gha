const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const { tokenKey } = require('../controllers/token-key');
const Unautorized = require('../errors/unauthorized-err');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new Unautorized('Пожалуйста, авторизуйтесь'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : tokenKey);
  } catch (err) {
    next(new Unautorized('Пожалуйста, авторизуйтесь'));
    return;
  }

  req.user = payload;

  next();
};

module.exports = {
  auth,
};
