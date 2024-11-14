// routes/student.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const studentController = require('../controllers/studentController'); // Import the student controller

// Configure multer storage for saving uploaded images
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'), // Set the destination folder
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate unique filename
  }
});

const upload = multer({ storage: storage });

// Route to render the upload form
router.get('/new', studentController.renderForm);

// Route to handle form submission with image upload
router.post('/new', upload.single('image'), studentController.createStudent);

module.exports = router;
