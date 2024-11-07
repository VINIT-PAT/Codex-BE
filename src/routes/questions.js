const express = require('express');
const router = express.Router();
const { createQuestion, getQuestions } = require('../controllers/questionController');

// POST /api/questions
router.post('/', createQuestion);

// GET /api/questions
router.get('/', getQuestions);

module.exports = router;
