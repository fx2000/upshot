const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const User = require('../models/User');

// Auth middleware
const { isLoggedIn } = require('../helpers/authMiddleware');
const uploadCloud = require('../helpers/cloudinary.js');

// List Projects
router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const projects = await Project.find({ deleted: false })
      .populate('creator')
      .populate({
        path: 'issues',
        match: { deleted: false }
      });
    res.status(200).json(projects);
    return;
  } catch (error) {
    next(error);
  }
});

// Create Project
router.post('/create', isLoggedIn(), uploadCloud.single('image'), async (req, res, next) => {
  const {
    name,
    description
  } = req.body;
  const user = req.session.currentUser;
  try {
    const newProjectDetails = {
      name: name,
      description: description,
      creator: user._id
    };
    // Check if the user included an image
    if (req.file) {
      newProjectDetails.image = req.file.url;
    }
    // Check if the name is taken by an active project
    const projectExists = await Project.findOne(
      {
        name: name,
        deleted: false
      }
    );
    if (!projectExists) {
      const newProject = await Project.create(newProjectDetails);
      await User.findByIdAndUpdate(user._id,
        {
          $push: { projects: newProject._id }
        }
      );
      res.status(200).json(newProject);
      return;
    } else {
      res.status(400).send('That project name is already in use');
    }
  } catch (error) {
    next(error);
  }
});

// Update Project
router.put('/:id/update', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description
  } = req.body;
  try {
    const project = await Project.findById(id);
    if (project.creator.toString() === req.session.currentUser._id) {
      const updateProject = await Project.findByIdAndUpdate(id,
        {
          $set: {
            name: name,
            description: description
          }
        },
        {
          new: true
        }
      );
      res.status(200).json(updateProject);
      return;
    } else {
      res.status(401).end("A project can only be updated by it's creator");
      return;
    }
  } catch (error) {
    next(error);
  }
});

// Delete Project
router.get('/:id/delete', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (project.creator._id.toString() === req.session.currentUser._id) {
      const deleteProject = await Project.findByIdAndUpdate(id,
        {
          $set: { deleted: true }
        },
        {
          new: true
        }
      );
      res.status(200).json(deleteProject);
      return;
    } else {
      res.status(401).end("A project can only be deleted by it's creator");
      return;
    }
  } catch (error) {
    next(error);
  }
});

// Get Project details
router.get('/:id', isLoggedIn(), async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const project = await Project.findById(id, { deleted: false })
      .populate({
        path: 'creator',
        match: { deleted: false }
      })
      .populate({
        path: 'issues',
        match: { deleted: false }
      });
    res.status(200).json(project);
    return;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
