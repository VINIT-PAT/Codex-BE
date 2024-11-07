// src/models/Test.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [{
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answer: String,
    output: String
  }],
  grade: String,
  feedback: String
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  submissions: [submissionSchema]
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
