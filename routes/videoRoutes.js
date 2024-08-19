const express = require('express');
const multer = require('multer');
const { uploadVideo } = require('../controllers/videoController');

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for video upload and analysis
router.post('/upload-video', upload.single('video'), uploadVideo);

module.exports = router;
