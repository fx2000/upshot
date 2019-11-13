const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');

// Auth middleware
const {
  isLoggedIn,
  isNotLoggedIn
} = require('../helpers/authMiddleware');

// Login
router.post('/login', isNotLoggedIn(), async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      next(createError(404));
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.status(200).json(user);
      return;
    } else {
      next(createError(401));
    }
  } catch (error) {
    next(error);
  }
});

// Sign-up
router.post('/signup', isNotLoggedIn(), async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    image
  } = req.body;
  try {
    const emailExists = await User.findOne({ email }, 'email');
    if (emailExists) {
      return next(createError(400));
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPass,
        image: image
      });
      req.session.currentUser = newUser;
      res.status(200).json(newUser);
    }
  } catch (error) {
    next(error);
  }
});

// Log out
router.post('logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res.status(204).send();
});

module.exports = router;
