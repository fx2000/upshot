const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// Auth middleware
const { isLoggedIn } = require('../helpers/authMiddleware');

// List issues
router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
    return;
  } catch (error) {
    next(error);
  }
});

// Get Issue details
router.get('/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);
    res.status(200).json(issue);
    return;
  } catch (error) {
    next(error);
  }
});

// Create Issue
router.post('/create', isLoggedIn(), async (req, res, next) => {
  const {
    title,
    content,
    project,
    priority,
    attachments
  } = req.body;
  const creator = req.session.currentUser._id;

  try {
    const newIssue = await Issue.create({
      title: title,
      content: content,
      project: project,
      creator: creator,
      priority: priority,
      attachments: attachments
    });
    res.status(200).json(newIssue);
  } catch (error) {
    next(error);
  }
});

// Update Issue
router.put('/edit', isLoggedIn(), async (req, res, next) => {
  const {
    id,
    title,
    content,
    project,
    priority,
    status,
    attachments
  } = req.body;
  try {
    const issue = await Issue.findById(id);
    if (issue.creator._id === req.session.currentUser._id) {
      await Issue.findByIdAndUpdate(id,
        {
          $set: {
            title: title,
            content: content,
            project: project,
            priority: priority,
            status: status,
            attachments: attachments
          }
        }
      );
    } else {
      res.status(401).json(issue);
      return;
    }
  } catch (error) {
    next(error);
  }
});

// Delete Issue
router.get('/delete/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);
    if (issue.creator._id === req.session.currentUser._id) {
      await Issue.findByIdAndUpdate(id,
        { $set: { deleted: true } }
      );
      res.status(200).json(issue);
      return;
    } else {
      res.status(401).json(issue);
      return;
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
