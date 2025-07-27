const { validationResult } = require('express-validator');
const User = require('../models/User');
const pool = require('../config/db');

const careerOptionsData = {
  technical: {
    title: "Software Development & Technology",
    description: "Perfect for logical thinkers who enjoy problem-solving and creating digital solutions.",
    skills: ["Programming", "Problem Solving", "Analytical Thinking", "Innovation"],
    careers: ["Software Engineer", "Data Scientist", "Cybersecurity Specialist", "AI/ML Engineer"],
    growth: "High demand with excellent growth prospects in the digital economy."
  },
  creative: {
    title: "Creative & Design",
    description: "Ideal for artistic minds who want to express creativity and design beautiful experiences.",
    skills: ["Creativity", "Visual Design", "Communication", "Innovation"],
    careers: ["UX/UI Designer", "Graphic Designer", "Content Creator", "Digital Marketer"],
    growth: "Growing field with opportunities in digital media and user experience."
  },
  business: {
    title: "Business & Management",
    description: "Great for leaders who enjoy strategy, team management, and driving business growth.",
    skills: ["Leadership", "Strategic Thinking", "Communication", "Analysis"],
    careers: ["Product Manager", "Business Analyst", "Consultant", "Entrepreneur"],
    growth: "Stable career path with opportunities for leadership and business impact."
  }
};

const processTest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { answers } = req.body;
    const userId = req.user.id;

    // Simple scoring algorithm based on answers
    const scores = {
      technical: 0,
      creative: 0,
      business: 0
    };

    // Process answers and calculate scores
    answers.forEach((answer, index) => {
      switch (index) {
        case 0: // Problem-solving preference
          if (answer === 'logical') scores.technical += 3;
          if (answer === 'creative') scores.creative += 3;
          if (answer === 'strategic') scores.business += 3;
          break;
        case 1: // Work environment
          if (answer === 'computer') scores.technical += 2;
          if (answer === 'studio') scores.creative += 2;
          if (answer === 'office') scores.business += 2;
          break;
        case 2: // Skills interest
          if (answer === 'coding') scores.technical += 3;
          if (answer === 'design') scores.creative += 3;
          if (answer === 'management') scores.business += 3;
          break;
        case 3: // Career goal
          if (answer === 'innovation') scores.technical += 2;
          if (answer === 'expression') scores.creative += 2;
          if (answer === 'leadership') scores.business += 2;
          break;
        default:
          break;
      }
    });

    // Sort career options by score
    const sortedCareers = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .map(([key]) => ({
        id: key,
        ...careerOptionsData[key],
        score: scores[key]
      }));

    // Take top 3 career options
    const topThreeCareers = sortedCareers.slice(0, 3);

    // Save test results to database
    await pool.query(
      'INSERT INTO test_results (user_id, answers, career_options) VALUES ($1, $2, $3)',
      [userId, JSON.stringify(answers), JSON.stringify(topThreeCareers)]
    );

    // Update user's test completion status and career options
    await User.updateTestCompletion(userId, topThreeCareers);

    res.json({
      success: true,
      message: 'Test completed successfully',
      data: {
        career_options: topThreeCareers,
        xp_gained: 100
      }
    });

  } catch (error) {
    console.error('Test processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during test processing'
    });
  }
};

const getTestQuestions = (req, res) => {
  const questions = [
    {
      id: 1,
      question: "How do you prefer to solve problems?",
      options: [
        { value: "logical", label: "Through logical analysis and systematic approaches" },
        { value: "creative", label: "Through creative thinking and innovative solutions" },
        { value: "strategic", label: "Through strategic planning and team collaboration" }
      ]
    },
    {
      id: 2,
      question: "What work environment appeals to you most?",
      options: [
        { value: "computer", label: "Working with computers and technology" },
        { value: "studio", label: "Creative studio or design workspace" },
        { value: "office", label: "Professional office with team meetings" }
      ]
    },
    {
      id: 3,
      question: "Which skills would you like to develop further?",
      options: [
        { value: "coding", label: "Programming and technical skills" },
        { value: "design", label: "Design and creative skills" },
        { value: "management", label: "Leadership and management skills" }
      ]
    },
    {
      id: 4,
      question: "What motivates you most in your career?",
      options: [
        { value: "innovation", label: "Creating innovative solutions and products" },
        { value: "expression", label: "Expressing creativity and artistic vision" },
        { value: "leadership", label: "Leading teams and driving business success" }
      ]
    }
  ];

  res.json({
    success: true,
    data: { questions }
  });
};

module.exports = {
  processTest,
  getTestQuestions
};
