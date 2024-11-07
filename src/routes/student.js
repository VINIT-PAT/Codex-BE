const express = require('express');
const { getAvailableTests, getTestDetails, submitTest } = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/tests', authMiddleware, asyncHandler(getAvailableTests));
router.get('/tests/:testId', authMiddleware, asyncHandler(getTestDetails));
router.post('/tests/:testId/submit', authMiddleware, asyncHandler(submitTest));

module.exports = router;
