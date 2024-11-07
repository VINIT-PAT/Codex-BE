const express = require('express');
const { v4: uuidv4 } = require('uuid');  // Use uuid for unique IDs
const router = express.Router();

let questions = [];

// POST endpoint to add a new question
router.post('/', (req, res) => {
  const { title, description, difficulty, testCases } = req.body;

  const newQuestion = {
    id: uuidv4(),  // Generate a unique ID for each question
    title,
    description,
    difficulty,
    testCases
  };

  questions.push(newQuestion);

  res.status(201).json({ message: 'Question added successfully', question: newQuestion });
});

// GET endpoint to fetch all questions
router.get('/', (req, res) => {
  res.json(questions);
});

// GET endpoint to fetch a single question by ID
router.get('/:id', (req, res) => {
  const question = questions.find(q => q.id === req.params.id);
  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ error: 'Question not found' });
  }
});

module.exports = router;