const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const Comment = require('../models/Comment');

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

// Comment on Issue
router.post('/:id/comment', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  const user = req.session.currentUser;
  try {
    const newComment = await Comment.create({
      user: user._id,
      issue: id,
      content: content
    });
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
});

// Follow Issue
router.get('/:id/follow', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const user = req.session.currentUser;
  try {
    const follow = await Issue.findByIdAndUpdate(id,
      {
        $push: {
          followers: user._id
        }
      }
    );
    res.status(200).json(follow);
  } catch (error) {
    next(error);
  }
});

// Takeover Issue
router.get('/:id/takeover', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const user = req.session.currentUser;
  try {
    const takeover = await Issue.findByIdAndUpdate(id,
      {
        $push: {
          assignedTo: user._id
        }
      }
    );
    res.status(200).json(takeover);
  } catch (error) {
    next(error);
  }
});

// Assign Issue
router.post('/:id/assign', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const user = req.body.id;
  try {
    const assign = await Issue.findByIdAndUpdate(id,
      {
        $push: {
          assignedTo: user
        }
      }
    );
    res.status(200).json(assign);
  } catch (error) {
    next(error);
  }
});

// Create Issue TODO: Attachments
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

// Update Issue TODO: Attachments
router.put('/:id/edit', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const {
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
      const updateIssue = await Issue.findByIdAndUpdate(id,
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
      res.status(200).json(updateIssue);
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
      const deleteIssue = await Issue.findByIdAndUpdate(id,
        { $set: { deleted: true } }
      );
      res.status(200).json(deleteIssue);
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
