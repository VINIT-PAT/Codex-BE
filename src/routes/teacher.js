const express = require('express');
const {
  createTest,
  addQuestion,
  editQuestion,
  deleteQuestion,
  getSubmissions,
  provideFeedback,
  gradeSubmission,
} = require('../controllers/teacherController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/create-exam', authMiddleware, asyncHandler(createTest));
router.post('/:testId/add-question', authMiddleware, asyncHandler(addQuestion));
router.put('/:testId/edit-question/:questionId', authMiddleware, asyncHandler(editQuestion));
router.delete('/:testId/delete-question/:questionId', authMiddleware, asyncHandler(deleteQuestion));
router.get('/:testId/submissions', authMiddleware, asyncHandler(getSubmissions));
router.post('/:testId/submissions/:submissionId/feedback', authMiddleware, asyncHandler(provideFeedback));
router.post('/:testId/submissions/:submissionId/grade', authMiddleware, asyncHandler(gradeSubmission));

module.exports = router;
