const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');

// Middlewares
const {
  isLoggedIn,
  isNotLoggedIn
} = require('../helpers/authMiddleware');
const uploadCloud = require('../helpers/cloudinary.js');

// Login
router.post('/login', isNotLoggedIn(), async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne(
      { email: email }
    ).lean().select('+password');
    if (!user) {
      res.status(404).end('Invalid email/password combination');
      return;
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      delete user.password;
      res.status(200).json(user);
      return;
    } else {
      res.status(401).end('Invalid email/password combination');
      return;
    }
  } catch (error) {
    next(error);
  }
});

// Sign-up
router.post('/signup', isNotLoggedIn(), uploadCloud.single('avatar'), async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;
  try {
    const emailExists = await User.findOne({ email }, 'email');
    if (!emailExists) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUserDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPass
      };
      // Check if user included a custom avatar
      if (req.file) {
        newUserDetails.avatar = req.file.url;
      }
      let newUser = await User.create(newUserDetails);
      req.session.currentUser = newUser;
      newUser = {
        ...newUser._doc,
        password: undefined
      };
      res.status(200).json(newUser);
      return;
    } else {
      res.status(400).end('Email is already in use');
      return;
    }
  } catch (error) {
    next(error);
  }
});

// Me
router.get('/me', isLoggedIn(), (req, res, next) => {
  req.session.currentUser.password = undefined;
  res.json(req.session.currentUser);
});

// Log out
router.get('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res.status(204).end();
});

module.exports = router;
