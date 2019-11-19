const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');
const authRouter = require('./auth')

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
    // lean() converts the mongoose object into a javascript object
    const user = await User.findOne(
      { email: email }
    ).lean().select('+password');
    // Check if user exists
    if (!user) {
      res.status(401).end('Invalid email/password combination');
      return;
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      // Remove password before returning user information (this is why you need lean())
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
    // Check if email is already in use
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
      // Remove password before returning new user information (TODO: Can we use lean() here?)
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

// Active session check TODO: Find a way to call the users route to avoid checking database from here. DRY!
router.get('/me', isLoggedIn(), async (req, res, next) => {
  const user = await User.findById(req.session.currentUser._id, { deleted: false })
    .populate({
      path: 'issues',
      match: {
        deleted: false
      }
    })
    .populate({
      path: 'projects',
      match: {
        deleted: false
      }
    })
    .populate({
      path: 'comments',
      match: {
        deleted: false
      }
    })
    .populate({
      path: 'following',
      match: {
        deleted: false
      }
    })
    .populate({
      path: 'assignedTo',
      match: {
        deleted: false
      }
    });
  res.json(user);
});

// Log out
router.get('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  res.status(204).end();
});

module.exports = router;
