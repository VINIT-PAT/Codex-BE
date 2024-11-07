const Question = require('../models/Question');

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newQuestion = new Question({ title, description });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Error creating question', error });
  }
};

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

module.exports = { createQuestion, getQuestions };
