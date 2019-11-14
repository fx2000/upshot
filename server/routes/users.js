const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middlewares
const { isLoggedIn } = require('../helpers/authMiddleware');
const uploadCloud = require('../helpers/cloudinary.js');

// List users
router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const users = await User.find({ deleted: false });
    res.status(200).json(users);
    return;
  } catch (error) {
    next(error);
  }
});

// Update user details
router.put('/:id/update', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email
  } = req.body;
  try {
    if (id === req.session.currentUser._id) {
      // Check if email is already in use
      const emailExists = await User.findOne({ email }, 'email');
      if (!emailExists) {
        const updateUser = await User.findByIdAndUpdate(id, {
          $set: {
            firstName: firstName,
            lastName: lastName,
            email: email
          }
        }, {
          new: true
        });
        res.status(200).json(updateUser);
        return;
      } else {
        res.status(400).end('Email is already is use');
      }
    } else {
      res.status(401).end("You can't update another user's details");
      return;
    }
  } catch (error) {
    next(error);
  }
});

// Update avatar
router.post('/:id/update-avatar', isLoggedIn(), uploadCloud.single('avatar'), async (req, res, next) => {
  const { id } = req.params;
  const avatar = req.file.url;
  try {
    if (id === req.session.currentUser._id) {
      const updateUser = await User.findByIdAndUpdate(id,
        {
          $set: { avatar: avatar }
        },
        {
          new: true
        }
      );
      res.status(200).json(updateUser);
      return;
    } else {
      res.status(401).end("You can't update another user's avatar");
      return;
    }
  } catch (error) {
    next(error);
  }
});

// Revert to default avatar
router.get('/:id/remove-avatar', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id === req.session.currentUser._id) {
      const updateUser = await User.findByIdAndUpdate(id,
        {
          $set: { avatar: 'https://res.cloudinary.com/fx2000/image/upload/v1573725101/upshot/project-placeholder.png' }
        },
        {
          new: true
        }
      );
      res.status(200).json(updateUser);
      return;
    } else {
      res.status(401).end("You can't remove another user's avatar");
      return;
    }
  } catch (error) {
    next(error);
  }
});

// Get user details
router.get('/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, { deleted: false })
      .populate({
        path: 'issues',
        match: { deleted: false }
      })
      .populate({
        path: 'projects',
        match: { deleted: false }
      })
      .populate({
        path: 'comments',
        match: { deleted: false }
      })
      .populate({
        path: 'following',
        match: { deleted: false }
      })
      .populate({
        path: 'assignedTo',
        match: { deleted: false }
      });
    res.status(200).json(user);
    return;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
