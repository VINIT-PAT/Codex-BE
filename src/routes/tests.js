const express = require('express');
const { createTest, getTestQuestions, submitTest, gradeTest, getAllTests, getSubmissions } = require('../controllers/testController');
const router = express.Router();

router.post('/', createTest);
router.get('/:testId/questions', getTestQuestions);
router.post('/:testId/submit', submitTest);
router.post('/:testId/grade', gradeTest);
router.get('/', getAllTests);
router.get('/:testId/submissions', getSubmissions);

module.exports = router;
