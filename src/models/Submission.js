// src/models/Submission.js
const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  code: { type: String, required: true },
  output: { type: String },
  feedback: { type: String },
  grade: { type: Number },
});

module.exports = mongoose.model('Submission', SubmissionSchema);
