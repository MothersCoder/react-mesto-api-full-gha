const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { tokenKey } = require('./token-key');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const Conflict = require('../errors/conflict-err');
const Unautorized = require('../errors/unauthorized-err');
const BadRequest = require('../errors/bad-request-err');

const getUserInfo = (id, res, next) => {
  User.findById(id, 'name about avatar email')
    .orFail(() => new NotFoundError('Пользователя с таким ID не существует.'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUserData = (req, res, next) => {
  getUserInfo(req.user._id, res, next);
};

const getUserById = (req, res, next) => {
  getUserInfo(req.params.id, res, next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже зарегистрирован'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введены некорректные данные при создании пользователя'));
        return;
      }
      next(err);
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const changeUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь не найден, указан неверный ID'))
    .then((newUserData) => res.status(200).send(newUserData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введены некорректные данные при изменении пользователя'));
        return;
      }
      next(err);
    });
};

const changeUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('Пользователь с таким ID не найден'))
    .then((newUserData) => res.status(200).send(newUserData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Введены некорректные данные при изменении аватара пользователя'));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => new Unautorized('Неверный логин или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          next(new Unautorized('Неверный логин или пароль'));
          return;
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : tokenKey, { expiresIn: '7d' });
        res.cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        });
        // eslint-disable-next-line consistent-return
        return res.status(200);
      }))
    .catch(next);
};

module.exports = {
  createUser,
  getUserById,
  getUserData,
  getUsers,
  changeUserData,
  changeUserAvatar,
  login,
};
