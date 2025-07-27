const express = require('express');
const { body } = require('express-validator');
const { processTest, getTestQuestions } = require('../controllers/testController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Validation middleware for test submission
const testValidation = [
  body('answers')
    .isArray({ min: 1 })
    .withMessage('Answers must be a non-empty array'),
  body('answers.*')
    .isString()
    .notEmpty()
    .withMessage('Each answer must be a non-empty string')
];

// Routes
router.get('/questions', authMiddleware, getTestQuestions);
router.post('/submit', authMiddleware, testValidation, processTest);

// Get test status
router.get('/status', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: {
      test_completed: req.user.test_completed,
      career_options: req.user.career_options
    }
  });
});

module.exports = router;
