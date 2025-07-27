const express = require('express');
const { body } = require('express-validator');
const { 
  getDashboard, 
  updateProfile, 
  getCommunityData, 
  getTasksData 
} = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Validation middleware for profile update
const profileUpdateValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('profile_image')
    .optional()
    .isURL()
    .withMessage('Profile image must be a valid URL')
];

// All dashboard routes require authentication
router.use(authMiddleware);

// Main dashboard data
router.get('/', getDashboard);

// Profile management
router.put('/profile', profileUpdateValidation, updateProfile);

// Community data
router.get('/community', getCommunityData);

// Tasks data
router.get('/tasks', getTasksData);

// Complete a task (mock implementation)
router.post('/tasks/:taskId/complete', (req, res) => {
  const { taskId } = req.params;
  
  // In a real app, you'd update the database and user's XP
  res.json({
    success: true,
    message: 'Task completed successfully',
    data: {
      task_id: taskId,
      xp_gained: 50,
      new_xp_total: req.user.xp_level + 50
    }
  });
});

// Get user achievements
router.get('/achievements', (req, res) => {
  const userLevel = Math.floor(req.user.xp_level / 100) + 1;
  
  const achievements = [
    {
      id: 1,
      title: 'Welcome Aboard',
      description: 'Joined Level up platform',
      icon: '🎉',
      unlocked: true,
      unlock_date: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Career Explorer',
      description: 'Completed career assessment test',
      icon: '🧭',
      unlocked: req.user.test_completed,
      unlock_date: req.user.test_completed ? new Date().toISOString() : null
    },
    {
      id: 3,
      title: 'Level Up',
      description: 'Reached level 2',
      icon: '⭐',
      unlocked: userLevel >= 2,
      unlock_date: userLevel >= 2 ? new Date().toISOString() : null
    },
    {
      id: 4,
      title: 'Career Master',
      description: 'Reached level 5',
      icon: '👑',
      unlocked: userLevel >= 5,
      unlock_date: userLevel >= 5 ? new Date().toISOString() : null
    }
  ];

  res.json({
    success: true,
    data: {
      achievements,
      total_unlocked: achievements.filter(a => a.unlocked).length,
      total_available: achievements.length
    }
  });
});

// Get resume data (mock)
router.get('/resume', (req, res) => {
  res.json({
    success: true,
    data: {
      sections: [
        {
          id: 'personal',
          title: 'Personal Information',
          completed: true,
          fields: ['name', 'email', 'phone', 'location']
        },
        {
          id: 'experience',
          title: 'Work Experience',
          completed: false,
          fields: ['company', 'position', 'duration', 'description']
        },
        {
          id: 'education',
          title: 'Education',
          completed: false,
          fields: ['institution', 'degree', 'graduation_year']
        },
        {
          id: 'skills',
          title: 'Skills',
          completed: req.user.test_completed,
          fields: ['technical_skills', 'soft_skills', 'languages']
        }
      ],
      completion_percentage: req.user.test_completed ? 50 : 25
    }
  });
});

module.exports = router;
