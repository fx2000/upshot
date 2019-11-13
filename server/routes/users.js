const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Auth middleware
const { isLoggedIn } = require('../helpers/authMiddleware');

// List users TODO: Remove passwords
router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// Get user details TODO: Populate, remove password
router.get('/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// Update user details TODO: Remove password
router.put('/edit', isLoggedIn(), async (req, res, next) => {
  const {
    id,
    firstName,
    lastName,
    email,
    image
  } = req.body;
  try {
    const user = await User.findById(id);
    if (user.id === req.session.currentUser._id) {
      await User.findByIdAndUpdate(id,
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            image: image
          }
        }
      );
    } else {
      res.status(401).json(user);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
