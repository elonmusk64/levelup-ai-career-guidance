const { validationResult } = require('express-validator');

// Mock AI responses for career guidance
const generateAIResponse = (message, userCareerOptions = []) => {
  const lowerMessage = message.toLowerCase();
  
  // Career-specific responses
  if (lowerMessage.includes('career') || lowerMessage.includes('job')) {
    if (userCareerOptions.length > 0) {
      const topCareer = userCareerOptions[0];
      return `Based on your career assessment, you showed strong alignment with ${topCareer.title}. This field focuses on ${topCareer.description.toLowerCase()} Key skills to develop include: ${topCareer.skills.join(', ')}. Would you like specific advice on getting started in this field?`;
    }
    return "I'd be happy to help with career guidance! To give you personalized advice, could you tell me about your interests, skills, or the career path you're considering?";
  }
  
  if (lowerMessage.includes('skill') || lowerMessage.includes('learn')) {
    return "Developing new skills is crucial for career growth! Based on current market trends, I recommend focusing on: 1) Digital literacy and tech skills, 2) Communication and collaboration, 3) Problem-solving and critical thinking, 4) Adaptability and continuous learning. Which area interests you most?";
  }
  
  if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
    return "A strong resume should highlight your relevant experience, skills, and achievements. Key tips: 1) Tailor it to each job application, 2) Use action verbs and quantify achievements, 3) Keep it concise (1-2 pages), 4) Include relevant keywords from job descriptions. Would you like help with a specific section?";
  }
  
  if (lowerMessage.includes('interview')) {
    return "Interview preparation is key to success! Here are essential tips: 1) Research the company and role thoroughly, 2) Practice common interview questions, 3) Prepare specific examples using the STAR method, 4) Ask thoughtful questions about the role and company, 5) Follow up with a thank-you email. What aspect of interviewing would you like to focus on?";
  }
  
  if (lowerMessage.includes('salary') || lowerMessage.includes('negotiate')) {
    return "Salary negotiation is an important career skill! Research market rates for your role and location using sites like Glassdoor or PayScale. Consider the total compensation package, not just base salary. Present your value proposition clearly and be prepared to discuss your achievements. Would you like tips on how to approach this conversation?";
  }
  
  if (lowerMessage.includes('network') || lowerMessage.includes('connect')) {
    return "Networking is crucial for career success! Start by: 1) Optimizing your LinkedIn profile, 2) Attending industry events and webinars, 3) Joining professional associations, 4) Reaching out to alumni and colleagues, 5) Offering value before asking for help. Quality connections matter more than quantity. How can I help you build your network?";
  }
  
  if (lowerMessage.includes('change') || lowerMessage.includes('transition')) {
    return "Career transitions can be exciting opportunities for growth! Key steps: 1) Assess your transferable skills, 2) Research your target industry thoroughly, 3) Build relevant skills through courses or projects, 4) Network with professionals in your target field, 5) Consider transitional roles or freelance work. What type of career change are you considering?";
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm your AI career guidance assistant. I'm here to help you with career planning, skill development, job search strategies, and professional growth. What career topic would you like to explore today?";
  }
  
  if (lowerMessage.includes('thank')) {
    return "You're very welcome! I'm here whenever you need career guidance or have questions about your professional development. Best of luck with your career journey!";
  }
  
  // Default response
  return "I'm here to help with your career development! I can assist with career planning, skill development, resume writing, interview preparation, networking, and job search strategies. What specific career topic would you like to discuss?";
};

const getChatResponse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { message, conversation_history = [] } = req.body;
    const userId = req.user.id;

    // Get user's career options for personalized responses
    const userCareerOptions = req.user.career_options || [];

    // Generate AI response
    const aiResponse = generateAIResponse(message, userCareerOptions);

    // In a real implementation, you would:
    // 1. Save the conversation to database
    // 2. Use a real AI service like OpenRouter
    // 3. Implement conversation context and memory

    const responseData = {
      message: aiResponse,
      timestamp: new Date().toISOString(),
      conversation_id: `conv_${userId}_${Date.now()}`,
      suggestions: [
        "Tell me about career paths in technology",
        "How can I improve my resume?",
        "What skills should I develop?",
        "Help me prepare for interviews"
      ]
    };

    res.json({
      success: true,
      message: 'AI response generated successfully',
      data: responseData
    });

  } catch (error) {
    console.error('AI Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating AI response'
    });
  }
};

const getChatHistory = async (req, res) => {
  try {
    // Mock chat history - in a real app, fetch from database
    const chatHistory = [
      {
        id: 1,
        user_message: "Hello, I need help with my career",
        ai_response: "Hello! I'm here to help with your career development. What specific area would you like to focus on?",
        timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      }
    ];

    res.json({
      success: true,
      data: {
        conversations: chatHistory,
        total_messages: chatHistory.length * 2
      }
    });

  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching chat history'
    });
  }
};

module.exports = {
  getChatResponse,
  getChatHistory
};
