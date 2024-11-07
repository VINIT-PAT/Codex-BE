const Test = require('../models/Test');
const Submission = require('../models/Submission');

const createTest = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const newTest = new Test({ title, questions });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating test', error });
  }
};

const getTestQuestions = async (req, res) => {
  const { testId } = req.params;
  try {
    const test = await Test.findById(testId).populate('questions');
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    const questions = test.questions;
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching test questions', error });
  }
};

const submitTest = async (req, res) => {
  const { testId } = req.params;
  const { studentId, answers } = req.body;
  try {
    const newSubmission = new Submission({ test: testId, student: studentId, answers });
    await newSubmission.save();
    res.status(201).json({ message: 'Submission successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting test', error });
  }
};

const gradeTest = async (req, res) => {
  const { testId, studentId, grade, feedback } = req.body;
  try {
    const submission = await Submission.findOne({ test: testId, student: studentId });
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    submission.grade = grade;
    submission.feedback = feedback;
    await submission.save();
    res.status(200).json({ message: 'Grade submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error grading test', error });
  }
};

const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find({});
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tests', error });
  }
};

const getSubmissions = async (req, res) => {
  const { testId } = req.params;
  try {
    const submissions = await Submission.find({ test: testId }).populate('student');
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error });
  }
};

module.exports = { createTest, getTestQuestions, submitTest, gradeTest, getAllTests, getSubmissions };
