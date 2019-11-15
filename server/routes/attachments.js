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
  try {
    const issue = await Issue.findById(id, { deleted: false });
    if (issue.creator._id.toString() === req.session.currentUser._id) {
      const newAttachment = {
        url: url,
        uploader: req.session.currentUser._id,
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

// View Attatchment
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
    const attachment = await Attachment.findById(id, { deleted: false })
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
