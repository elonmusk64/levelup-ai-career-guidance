const express = require('express');
const { body } = require('express-validator');
const { getChatResponse, getChatHistory } = require('../controllers/aiChatController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Validation middleware for chat message
const chatValidation = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Message must be between 1 and 1000 characters'),
  body('conversation_history')
    .optional()
    .isArray()
    .withMessage('Conversation history must be an array')
];

// All chat routes require authentication
router.use(authMiddleware);

// Send message to AI
router.post('/message', chatValidation, getChatResponse);

// Get chat history
router.get('/history', getChatHistory);

// Get chat suggestions based on user's career options
router.get('/suggestions', (req, res) => {
  const userCareerOptions = req.user.career_options || [];
  
  let suggestions = [
    "How can I improve my resume?",
    "What skills should I develop for my career?",
    "Tell me about networking strategies",
    "How do I prepare for job interviews?"
  ];

  // Add personalized suggestions based on career options
  if (userCareerOptions.length > 0) {
    const topCareer = userCareerOptions[0];
    suggestions.unshift(`Tell me more about ${topCareer.title} career path`);
    suggestions.unshift(`What skills do I need for ${topCareer.title}?`);
  }

  res.json({
    success: true,
    data: {
      suggestions: suggestions.slice(0, 6), // Return top 6 suggestions
      personalized: userCareerOptions.length > 0
    }
  });
});

// Clear chat history (mock implementation)
router.delete('/history', (req, res) => {
  res.json({
    success: true,
    message: 'Chat history cleared successfully'
  });
});

// Get AI chat statistics
router.get('/stats', (req, res) => {
  // Mock statistics
  res.json({
    success: true,
    data: {
      total_conversations: 5,
      total_messages: 23,
      most_discussed_topics: [
        'Career Planning',
        'Resume Writing', 
        'Interview Preparation',
        'Skill Development'
      ],
      last_chat_date: new Date().toISOString()
    }
  });
});

module.exports = router;
