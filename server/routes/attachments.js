const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');
const Attachment = require('../models/Attachment');

// Middlewares
const { isLoggedIn } = require('../helpers/authMiddleware');
const uploadCloud = require('../helpers/cloudinary.js');

// Add attachments
router.post('/add', isLoggedIn(), uploadCloud.single('attachment'), async (req, res, next) => {
  const { url } = req.file;
  const { id } = req.body;
  const user = req.session.currentUser;
  try {
    // Check is current user is the issue's creator
    const issue = await Issue.findById(id, { deleted: false });
    if (issue.creator._id.toString() === user._id) {
      const newAttachment = {
        url: url,
        uploader: user._id,
        issue: id
      };
      await Attachment.create(newAttachment);
      res.status(200).json(newAttachment);
      return;
    } else {
      res.status(401).end("Only the issue's creator can add an attachment");
      return;
    }
  } catch (error) {
    next(error);
  }
});

// View Attatchment TODO: Is this really necesary? YAGNI!
router.get('/:id', isLoggedIn(), async (req, res, next) => {
  const id = req.params;
  try {
    const attachment = await Attachment.findById(id, { deleted: false });
    res.status(200).json(attachment);
    return;
  } catch (error) {
    next(error);
  }
});

// Remove Attatchment
router.get('/:id/delete', isLoggedIn(), async (req, res, next) => {
  const id = req.params;
  try {
    // TODO: Check for a better way to Find and then Update if the condition is true
    const attachment = await Attachment.findById(id, { deleted: false })
    // Check if the current user is the attachment's uploader
    if (attachment.uploader._id.toString() === req.session.currentUser._id) {
      const deleteAttachment = await Attachment.findByIdAndUpdate(id, {
        $set: {
          deleted: true
        }
      }, {
        new: true
      });
      res.status(200).json(deleteAttachment);
      return;
    } else {
      res.status(401).end('Only the original uploader can delete an attachment');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
