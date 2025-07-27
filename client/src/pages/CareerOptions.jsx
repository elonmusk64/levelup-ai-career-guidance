import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AIChat from '../components/AIChat';

const CareerOptions = () => {
  const { user } = useAuth();
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const careerOptions = user?.career_options || [];

  useEffect(() => {
    // Auto-select the first career option
    if (careerOptions.length > 0) {
      setSelectedCareer(careerOptions[0]);
    }
  }, [careerOptions]);

  const handleCareerSelect = (career) => {
    setSelectedCareer(career);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-blue-600 bg-blue-100';
    if (score >= 4) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getMatchPercentage = (score) => {
    return Math.min(Math.round((score / 10) * 100), 100);
  };

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
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-secondary-600">
                Welcome, {user?.name}
              </span>
              <Link
                to="/dashboard"
                className="btn-primary"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Success Message */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 animate-fade-in">
            <div className="flex items-center">
              <div className="text-green-400 mr-4">
                <span className="text-3xl">🎉</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  Assessment Complete!
                </h2>
                <p className="text-green-700">
                  Congratulations! You've earned <strong>100 XP</strong> and unlocked your personalized career recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-secondary-900 mb-4">
              Your Career Matches
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Based on your assessment, here are the top career paths that align with your skills, interests, and personality.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Career Options List */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {careerOptions.map((career, index) => (
                  <div
                    key={career.id}
                    className={`card-hover cursor-pointer transition-all duration-300 ${
                      selectedCareer?.id === career.id
                        ? 'ring-2 ring-primary-500 bg-primary-50'
                        : ''
                    }`}
                    onClick={() => handleCareerSelect(career)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                          index === 0 ? 'bg-gold text-yellow-800' :
                          index === 1 ? 'bg-silver text-gray-700' :
                          'bg-bronze text-orange-700'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-secondary-900">
                            {career.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(career.score)}`}>
                              {getMatchPercentage(career.score)}% Match
                            </span>
                            {index === 0 && (
                              <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                                Best Match
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-secondary-700 mb-4 leading-relaxed">
                      {career.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-secondary-800 mb-2">Key Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-secondary-800 mb-2">Career Paths:</h4>
                        <ul className="text-sm text-secondary-600 space-y-1">
                          {career.careers.slice(0, 3).map((careerPath, pathIndex) => (
                            <li key={pathIndex} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                              {careerPath}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-secondary-50 rounded-lg p-3">
                      <h4 className="font-medium text-secondary-800 mb-1">Growth Outlook:</h4>
                      <p className="text-sm text-secondary-600">{career.growth}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="btn-primary flex-1 text-center"
                >
                  Continue to Dashboard
                </Link>
                <button
                  onClick={() => setShowChat(!showChat)}
                  className="btn-outline flex-1"
                >
                  {showChat ? 'Hide' : 'Show'} AI Career Coach
                </button>
              </div>
            </div>

            {/* AI Chat Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Selected Career Details */}
                {selectedCareer && (
                  <div className="card mb-6">
                    <h3 className="font-semibold text-secondary-800 mb-3">
                      Selected Career
                    </h3>
                    <div className="text-center">
                      <h4 className="text-lg font-medium text-primary-700 mb-2">
                        {selectedCareer.title}
                      </h4>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(selectedCareer.score)}`}>
                        {getMatchPercentage(selectedCareer.score)}% Match
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Chat */}
                <div className={`transition-all duration-300 ${showChat ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  {showChat && (
                    <div>
                      <h3 className="font-semibold text-secondary-800 mb-4">
                        AI Career Coach
                      </h3>
                      <AIChat userCareerOptions={careerOptions} />
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                {!showChat && (
                  <div className="card">
                    <h3 className="font-semibold text-secondary-800 mb-4">
                      Assessment Results
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-600">Careers Analyzed:</span>
                        <span className="font-medium">50+</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-600">Top Matches:</span>
                        <span className="font-medium">{careerOptions.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-600">XP Earned:</span>
                        <span className="font-medium text-green-600">+100 XP</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-600">Best Match:</span>
                        <span className="font-medium text-primary-600">
                          {getMatchPercentage(careerOptions[0]?.score || 0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Custom styles for medal colors
const styles = `
  .bg-gold { background: linear-gradient(135deg, #ffd700, #ffed4e); }
  .bg-silver { background: linear-gradient(135deg, #c0c0c0, #e5e7eb); }
  .bg-bronze { background: linear-gradient(135deg, #cd7f32, #f97316); }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default CareerOptions;
