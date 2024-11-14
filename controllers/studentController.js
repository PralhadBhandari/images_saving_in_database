// controllers/studentController.js
const path = require('path');
const Student = require('../models/student'); // Import the Student model

// Render the form for uploading a student image
exports.renderForm = (req, res) => {
  res.render('form'); // Render form.ejs where users can upload an image
};

// Handle student creation with image upload
exports.createStudent = async (req, res) => {
  try {
    const student = new Student({
      name: req.body.name,
      imagePath: req.file ? `/uploads/${req.file.filename}` : null, // Save image path if an image is uploaded
    });

    await student.save(); // Save student information to MongoDB
    res.render('success', { student }); // Render success.ejs with student info
  } catch (error) {
    console.error("Error saving student information:", error);
    res.status(500).send('Error saving student information');
  }
};
