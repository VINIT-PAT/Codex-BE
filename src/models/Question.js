// src/models/Question.js
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  prompt: { type: String, required: true },
  codePrompt: { type: String },
});

module.exports = mongoose.model('Question', QuestionSchema);
