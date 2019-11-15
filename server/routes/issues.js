const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const Project = require('../models/Project');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Attachment = require('../models/Attachment');

// Middlewares
const { isLoggedIn } = require('../helpers/authMiddleware');
const uploadCloud = require('../helpers/cloudinary.js');

// List issues TODO: Review autopopulate() plugin docs
router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const issues = await Issue.find({ deleted: false })
      .populate({
        path: 'project',
        match: { deleted: false }
      })
      .populate({
        path: 'creator',
        match: { deleted: false }
      })
      .populate({
        path: 'assignedTo',
        match: { deleted: false }
      })
      .populate({
        path: 'followers',
        match: { deleted: false }
      })
      .populate({
        path: 'comments',
        match: { deleted: false }
      })
      .populate({
        path: 'attachments',
        match: {
          deleted: false
        }
      });
    res.status(200).json(issues);
    return;
  } catch (error) {
    next(error);
  }
});

// Create Issue
router.post('/create', isLoggedIn(), uploadCloud.single('attachments'), async (req, res, next) => {
  const {
    title,
    content,
    project,
    priority
  } = req.body;
  const creator = req.session.currentUser._id;
  try {
    const newIssueDetails = {
      title: title,
      content: content,
      project: project,
      creator: creator,
      priority: priority
    };
    const newIssue = await Issue.create(newIssueDetails);
    // Check if the user included an attachment
    if (req.file) {
      const newAttachment = {
        url: req.file.url,
        uploader: req.session.currentUser._id,
        issue: newIssue._id
      };
      await Attachment.create(newAttachment);
    }
    // Add new issue to the appropriate project
    await Project.findByIdAndUpdate(project,
      {
        $push: { issues: newIssue._id }
      }
    );
    await User.findByIdAndUpdate(req.session.currentUser._id,
      {
        $push: { issues: newIssue._id }
      }
    );
    res.status(200).json(newIssue);
    return;
  } catch (error) {
    next(error);
  }
});

// Comment on Issue
router.post('/:id/comment', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const newComment = await Comment.create({
      user: req.session.currentUser._id,
      issue: id,
      content: content
    });
    await Issue.findByIdAndUpdate(id,
      {
        $push: { comments: newComment._id }
      }
    );
    await User.findByIdAndUpdate(req.session.currentUser._id,
      {
        $push: { comments: newComment._id }
      }
    );
    res.status(200).json(newComment);
    return;
  } catch (error) {
    next(error);
  }
});

// Follow Issue
router.get('/:id/follow', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const follow = await Issue.findByIdAndUpdate(id,
      {
        $addToSet: { followers: req.session.currentUser._id }
      },
      {
        new: true
      }
    );
    await User.findByIdAndUpdate(req.session.currentUser._id,
      {
        $addToSet: { following: id }
      }
    );
    res.status(200).json(follow);
    return;
  } catch (error) {
    next(error);
  }
});

// Unfollow Issue
router.get('/:id/unfollow', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const unfollow = await Issue.findByIdAndUpdate(id,
      {
        $pull: { followers: req.session.currentUser._id }
      },
      {
        new: true
      }
    );
    await User.findByIdAndUpdate(req.session.currentUser._id,
      {
        $pull: { following: id }
      }
    );
    res.status(200).json(unfollow);
    return;
  } catch (error) {
    next(error);
  }
});

// Takeover Issue
router.get('/:id/takeover', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const takeover = await Issue.findByIdAndUpdate(id,
      {
        $addToSet: { assignedTo: req.session.currentUser._id }
      },
      {
        new: true
      }
    );
    await User.findByIdAndUpdate(req.session.currentUser._id,
      {
        $addToSet: { assignedTo: id }
      }
    );
    res.status(200).json(takeover);
    return;
  } catch (error) {
    next(error);
  }
});

// Release Issue
router.get('/:id/release', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const release = await Issue.findByIdAndUpdate(id,
      {
        $pull: { assignedTo: req.session.currentUser._id }
      },
      {
        new: true
      }
    );
    await User.findByIdAndUpdate(req.session.currentUser._id,
      {
        $pull: { assignedTo: id }
      }
    );
    res.status(200).json(release);
    return;
  } catch (error) {
    next(error);
  }
});

// Assign Issue
router.post('/:id/assign', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body;
  try {
    const assign = await Issue.findByIdAndUpdate(id,
      {
        $addToSet: { assignedTo: user }
      },
      {
        new: true
      }
    );
    await User.findByIdAndUpdate(user,
      {
        $addToSet: { assignedTo: id }
      }
    );
    res.status(200).json(assign);
    return;
  } catch (error) {
    next(error);
  }
});

// Update Issue TODO: Check if file uploads are working correctly on update, they might be overwriting previous attachments
router.put('/:id/update', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    content,
    project,
    priority,
    status
  } = req.body;
  try {
    const issue = await Issue.findById(id);
    if (issue.creator._id.toString() === req.session.currentUser._id) {
      const updateIssue = await Issue.findOneAndUpdate(id,
        {
          $set: {
            title: title,
            content: content,
            project: project,
            priority: priority,
            status: status
          }
        },
        {
          new: true
        }
      );
      res.status(200).json(updateIssue);
      return;
    } else {
      res.status(401).end("An issue can only be updated by it's creator");
      return;
    }
  } catch (error) {
    next(error);
  }
});

// Delete Issue
router.get('/:id/delete', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);
    if (issue.creator._id.toString() === req.session.currentUser._id) {
      const deleteIssue = await Issue.findByIdAndUpdate(id,
        {
          $set: { deleted: true }
        },
        {
          new: true
        }
      );
      res.status(200).json(deleteIssue);
      return;
    } else {
      res.status(401).end("An issue can only be deleted by it's creator");
      return;
    }
  } catch (error) {
    next(error);
  }
});

// Get Issue details
router.get('/:id', isLoggedIn(), async (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const issue = await Issue.findById(id, { deleted: false })
      .populate({
        path: 'project',
        match: { deleted: false }
      })
      .populate({
        path: 'creator',
        match: { deleted: false }
      })
      .populate({
        path: 'assignedTo',
        match: { deleted: false }
      })
      .populate({
        path: 'followers',
        match: { deleted: false }
      })
      .populate({
        path: 'comments',
        match: { deleted: false }
      });
    res.status(200).json(issue);
    return;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
