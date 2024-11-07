// src/models/Exam.js
const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  instructions: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
});

module.exports = mongoose.model('Exam', ExamSchema);
