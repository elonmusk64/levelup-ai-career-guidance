const User = require('../models/User');

const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate XP level and progress
    const xpLevel = Math.floor(user.xp_level / 100) + 1;
    const xpProgress = user.xp_level % 100;
    const xpToNextLevel = 100 - xpProgress;

    // Mock data for dashboard features
    const dashboardData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_image: user.profile_image || null,
        xp_level: user.xp_level,
        level: xpLevel,
        xp_progress: xpProgress,
        xp_to_next_level: xpToNextLevel,
        test_completed: user.test_completed,
        career_options: user.career_options
      },
      stats: {
        tasks_completed: Math.floor(user.xp_level / 25),
        community_posts: Math.floor(user.xp_level / 50),
        resume_updates: user.test_completed ? 1 : 0,
        achievements: [
          ...(user.test_completed ? ['Career Test Completed'] : []),
          ...(user.xp_level >= 100 ? ['First Level Up'] : []),
          ...(user.xp_level >= 500 ? ['Career Explorer'] : []),
          ...(user.xp_level >= 1000 ? ['Career Master'] : [])
        ]
      },
      recent_activities: [
        ...(user.test_completed ? [{
          type: 'test',
          title: 'Completed Career Assessment',
          description: 'Discovered your top career matches',
          timestamp: new Date().toISOString(),
          xp_gained: 100
        }] : []),
        {
          type: 'signup',
          title: 'Joined Level up',
          description: 'Welcome to your career journey!',
          timestamp: new Date().toISOString(),
          xp_gained: 0
        }
      ]
    };

    res.json({
      success: true,
      message: 'Dashboard data retrieved successfully',
      data: dashboardData
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data'
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, profile_image } = req.body;

    // For now, we'll just return success - in a real app, you'd update the database
    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        name,
        profile_image
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
};

const getCommunityData = async (req, res) => {
  try {
    // Mock community data
    const communityData = {
      posts: [
        {
          id: 1,
          author: 'Sarah Johnson',
          title: 'Tips for transitioning to tech career',
          content: 'Here are some valuable insights I learned during my career transition...',
          likes: 24,
          comments: 8,
          timestamp: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          author: 'Mike Chen',
          title: 'My journey from designer to product manager',
          content: 'Sharing my experience and lessons learned...',
          likes: 18,
          comments: 12,
          timestamp: '2024-01-14T15:45:00Z'
        }
      ],
      user_level: Math.floor(req.user.xp_level / 100) + 1,
      can_post: req.user.test_completed
    };

    res.json({
      success: true,
      data: communityData
    });

  } catch (error) {
    console.error('Community data error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching community data'
    });
  }
};

const getTasksData = async (req, res) => {
  try {
    // Mock tasks data based on user's career options
    const user = await User.findById(req.user.id);
    const careerOptions = user.career_options || [];
    
    const tasks = [
      {
        id: 1,
        title: 'Complete LinkedIn Profile',
        description: 'Optimize your LinkedIn profile for your target career',
        category: 'Profile Building',
        xp_reward: 50,
        completed: false,
        difficulty: 'Easy'
      },
      {
        id: 2,
        title: 'Research Industry Trends',
        description: 'Study current trends in your chosen career field',
        category: 'Research',
        xp_reward: 75,
        completed: false,
        difficulty: 'Medium'
      },
      {
        id: 3,
        title: 'Network with Professionals',
        description: 'Connect with 5 professionals in your target industry',
        category: 'Networking',
        xp_reward: 100,
        completed: false,
        difficulty: 'Hard'
      }
    ];

    res.json({
      success: true,
      data: {
        tasks,
        completed_count: 0,
        total_count: tasks.length,
        available_xp: tasks.reduce((sum, task) => sum + task.xp_reward, 0)
      }
    });

  } catch (error) {
    console.error('Tasks data error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching tasks data'
    });
  }
};

module.exports = {
  getDashboard,
  updateProfile,
  getCommunityData,
  getTasksData
};
