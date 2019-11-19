const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Remote storage settings
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'upshot',
  allowedFormats: ['jpg', 'png', 'svg'],
  discard_original_filename: true
});

// File upload handler
const uploadCloud = multer({
  storage: storage
});

module.exports = uploadCloud;
