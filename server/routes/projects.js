const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Auth middleware
const { isLoggedIn } = require('../helpers/authMiddleware');

// List Projects
router.get('/', isLoggedIn(), async (req, res,next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
    return;
  } catch (error) {
    next(error);
  }
});

// Get Project details
router.get('/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

// Create Project TODO: Attachments
router.post('/create', isLoggedIn(), async (req, res, next) => {
  const {
    name,
    description,
    image
  } = req.body;
  try {
    const newProject = await Project.create({
      name: name,
      description: description,
      image: image
    });
    res.status(200).json(newProject);
  } catch (error) {
    next(error);
  }
});

// Update Project TODO: Attachments
router.put('/edit', isLoggedIn(), async (req, res, next) => {
  const {
    id,
    name,
    description,
    image
  } = req.body;
  try {
    const project = await Project.findById(id);
    if (project.creator._id === req.session.currentUser._id) {
      const updateProject = await Project.findByIdAndUpdate(id,
        {
          $set: {
            name: name,
            description: description,
            image: image
          }
        }
      );
      res.status(200).json(updateProject);
    } else {
      res.status(401).json(project);
      return;
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
