// src/controllers/teacherController.js
const Test = require('../models/Test');
const Question = require('../models/Question');
const Submission = require('../models/Submission');

const createTest = async (req, res) => {
  try {
    const { title, duration, instructions } = req.body;
    const newTest = new Test({ title, duration, instructions, teacher: req.user.id });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create test' });
  }
};

const addQuestion = async (req, res) => {
  try {
    const { testId } = req.params;
    const { prompt, instructions } = req.body;
    const question = new Question({ testId, prompt, instructions });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add question' });
  }
};

const editQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { prompt, instructions } = req.body;
    const question = await Question.findByIdAndUpdate(questionId, { prompt, instructions }, { new: true });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to edit question' });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    await Question.findByIdAndDelete(questionId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
};

const getSubmissions = async (req, res) => {
  try {
    const { testId } = req.params;
    const submissions = await Submission.find({ testId });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get submissions' });
  }
};

const provideFeedback = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { feedback } = req.body;
    const submission = await Submission.findByIdAndUpdate(submissionId, { feedback }, { new: true });
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to provide feedback' });
  }
};

const gradeSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { grade } = req.body;
    const submission = await Submission.findByIdAndUpdate(submissionId, { grade }, { new: true });
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to grade submission' });
  }
};

module.exports = {
  createTest,
  addQuestion,
  editQuestion,
  deleteQuestion,
  getSubmissions,
  provideFeedback,
  gradeSubmission,
};
