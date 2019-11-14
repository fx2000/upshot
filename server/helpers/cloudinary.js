const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'upshot',
  allowedFormats: ['jpg', 'png', 'svg'],
  discard_original_filename: true
});

const uploadCloud = multer({
  storage: storage
});

module.exports = uploadCloud;
