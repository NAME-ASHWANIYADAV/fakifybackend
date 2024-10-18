const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadVideo } = require('../controllers/videoController');

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Setting upload destination to "uploads/"');  // Log the destination
    cb(null, 'uploads/');  // Ensure the folder exists, or create it
  },
  filename: function (req, file, cb) {
    console.log('Uploading file:', file.originalname);  // Log the original file name
    cb(null, Date.now() + '-' + file.originalname);  // Append a timestamp to avoid file name conflicts
  },
});

const upload = multer({ storage: storage });

// Route for video upload
router.post('/upload-video', upload.single('video'), uploadVideo); // Simplified

module.exports = router;
