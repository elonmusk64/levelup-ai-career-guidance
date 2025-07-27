import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  // Fetch test questions on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/test/questions');
        if (response.data.success) {
          setQuestions(response.data.data.questions);
          setAnswers(new Array(response.data.data.questions.length).fill(''));
        } else {
          setError('Failed to load test questions');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load test questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unansweredQuestions = answers.findIndex(answer => !answer);
    if (unansweredQuestions !== -1) {
      setError(`Please answer question ${unansweredQuestions + 1} before submitting.`);
      setCurrentQuestion(unansweredQuestions);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('/api/test/submit', {
        answers: answers
      });

      if (response.data.success) {
        // Update user data with test completion
        updateUser({
          test_completed: true,
          career_options: response.data.data.career_options,
          xp_level: user.xp_level + response.data.data.xp_gained
        });
        
        // Navigate to career options page
        navigate('/career-options');
      } else {
        setError(response.data.message || 'Failed to submit test');
      }
    } catch (error) {
      console.error('Error submitting test:', error);
      setError(error.response?.data?.message || 'Failed to submit test');
    } finally {
      setSubmitting(false);
    }
  };

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const answeredCount = answers.filter(answer => answer).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-secondary-600 font-medium">Loading career assessment...</p>
        </div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-secondary-800 mb-4">
            Unable to Load Test
          </h1>
          <p className="text-secondary-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-secondary-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="text-xl font-heading font-bold text-secondary-800">
                Level up
              </span>
            </div>
            
            <div className="text-sm text-secondary-600">
              Welcome, {user?.name}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-heading font-bold text-secondary-900">
                Career Assessment
              </h1>
              <span className="text-sm text-secondary-600">
                {answeredCount} of {questions.length} completed
              </span>
            </div>
            
            <div className="w-full bg-secondary-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-secondary-600 mt-2">
              Answer these questions to discover your ideal career path
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 animate-fade-in">
              <div className="flex">
                <div className="text-red-400 mr-3">
                  <span className="text-xl">⚠️</span>
                </div>
                <div>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Question Card */}
          {questions.length > 0 && (
            <div className="card mb-8 animate-fade-in">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-secondary-500">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                
                <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                  {questions[currentQuestion]?.question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3 mb-8">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <label
                    key={index}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-primary-50 ${
                      answers[currentQuestion] === option.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-secondary-200 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={option.value}
                      checked={answers[currentQuestion] === option.value}
                      onChange={(e) => handleAnswerSelect(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                        answers[currentQuestion] === option.value
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-secondary-300'
                      }`}>
                        {answers[currentQuestion] === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`btn-secondary ${
                    currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Previous
                </button>

                <div className="flex space-x-3">
                  {currentQuestion < questions.length - 1 ? (
                    <button
                      onClick={handleNext}
                      disabled={!answers[currentQuestion]}
                      className={`btn-primary ${
                        !answers[currentQuestion] ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting || answeredCount < questions.length}
                      className={`btn-primary ${
                        submitting || answeredCount < questions.length
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      {submitting ? (
                        <div className="flex items-center">
                          <div className="loading-spinner mr-2"></div>
                          Analyzing...
                        </div>
                      ) : (
                        'Complete Assessment'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Question Overview */}
          <div className="card">
            <h3 className="text-lg font-semibold text-secondary-800 mb-4">
              Assessment Progress
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-full h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                    index === currentQuestion
                      ? 'bg-primary-600 text-white'
                      : answers[index]
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestPage;
