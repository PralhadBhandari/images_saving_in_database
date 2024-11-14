// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imagePath: { type: String }  // Field to store image path
});

module.exports = mongoose.model('Student', studentSchema);
