import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-heading font-bold text-secondary-800">
                Level up
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn-primary"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-secondary-900 mb-6 leading-tight">
              Level up Your
              <span className="text-gradient block mt-2">
                Career Journey
              </span>
            </h1>
            
            <p className="text-xl text-secondary-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover your ideal career path with AI-powered guidance, personalized assessments, and expert insights. Transform your professional future today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/signup"
                className="btn-primary text-lg px-8 py-4 animate-bounce-gentle"
              >
                Get Started Today
              </Link>
              <Link
                to="/login"
                className="btn-outline text-lg px-8 py-4"
              >
                Already have an account?
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 animate-slide-up animation-delay-200">
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-secondary-800 mb-3">
                AI Career Assessment
              </h3>
              <p className="text-secondary-600">
                Take our comprehensive assessment to discover career paths that match your skills, interests, and personality.
              </p>
            </div>
            
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-secondary-800 mb-3">
                AI Career Coach
              </h3>
              <p className="text-secondary-600">
                Get personalized guidance from our AI coach for resume building, interview prep, and career planning.
              </p>
            </div>
            
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-secondary-800 mb-3">
                Track Progress
              </h3>
              <p className="text-secondary-600">
                Monitor your career development with XP levels, achievements, and personalized learning paths.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 animate-slide-up animation-delay-400">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-heading font-bold text-secondary-800 mb-8">
                Join Thousands of Career Explorers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
                  <div className="text-secondary-600">Career Assessments</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">95%</div>
                  <div className="text-secondary-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                  <div className="text-secondary-600">Career Paths</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">24/7</div>
                  <div className="text-secondary-600">AI Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mt-20 animate-slide-up animation-delay-600">
            <h2 className="text-3xl font-heading font-bold text-secondary-800 mb-12">
              How Level up Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                  Take Assessment
                </h3>
                <p className="text-secondary-600">
                  Complete our comprehensive career assessment to understand your strengths and interests.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                  Get Recommendations
                </h3>
                <p className="text-secondary-600">
                  Receive personalized career recommendations based on your assessment results.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-secondary-800 mb-2">
                  Start Your Journey
                </h3>
                <p className="text-secondary-600">
                  Begin your career development with AI guidance, tasks, and community support.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-white animate-slide-up animation-delay-800">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Ready to Level up Your Career?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of professionals who have discovered their ideal career path with our AI-powered platform.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
            >
              Start Now - It's Free
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
