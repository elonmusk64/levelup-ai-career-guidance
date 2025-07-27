import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="text-xl font-heading font-bold">Level up</span>
            </div>
            <p className="text-secondary-300 mb-4 leading-relaxed">
              AI-powered career guidance platform helping professionals discover their ideal career path and achieve their goals.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-secondary-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <span className="text-xl">🐦</span>
              </a>
              <a
                href="#"
                className="text-secondary-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <span className="text-xl">💼</span>
              </a>
              <a
                href="#"
                className="text-secondary-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="GitHub"
              >
                <span className="text-xl">💻</span>
              </a>
            </div>
          </div>

          {/* Career Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Career Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Career Assessment
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Resume Builder
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Interview Prep
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Skill Development
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Career Paths
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary-300 hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-secondary-400 mb-4 md:mb-0">
              © {currentYear} Level up. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/login"
                className="text-secondary-300 hover:text-white transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-secondary-400 text-sm">
          <p>
            Empowering careers through AI-driven insights and personalized guidance. 
            Your journey to professional success starts here.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
