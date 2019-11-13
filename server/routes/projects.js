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

// Create Project
router.post('/create', isLoggedIn(), async (req, res, next) => {
  const {

  } = req.body;
  try {

  } catch (error) {
    next(error);
  }
});

module.exports = router;
