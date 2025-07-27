import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Clear errors when component mounts or form data changes
  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      // Check if user has completed test to determine redirect
      if (result.data.user.test_completed) {
        navigate('/dashboard');
      } else {
        navigate('/test');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-heading font-bold text-secondary-800">
              Level up
            </span>
          </Link>
          
          <h2 className="text-3xl font-heading font-bold text-secondary-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-secondary-600">
            Sign in to continue your career journey
          </p>
        </div>

        {/* Login Form */}
        <div className="card">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Global Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-fade-in">
                <div className="flex">
                  <div className="text-red-400 mr-3">
                    <span className="text-xl">⚠️</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-800">
                      Login Failed
                    </h3>
                    <p className="text-sm text-red-700 mt-1">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`input-field ${formErrors.email ? 'border-red-300 focus:ring-red-500' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <p className="error-message">{formErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className={`input-field pr-12 ${formErrors.password ? 'border-red-300 focus:ring-red-500' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-secondary-400 hover:text-secondary-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="text-sm">
                    {showPassword ? '🙈' : '👁️'}
                  </span>
                </button>
              </div>
              {formErrors.password && (
                <p className="error-message">{formErrors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="text-primary-600 hover:text-primary-500 font-medium">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full btn-primary ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-secondary-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            Demo Credentials
          </h3>
          <p className="text-sm text-blue-700">
            For testing purposes, you can create a new account or use the signup form to get started.
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="text-secondary-600 hover:text-secondary-800 text-sm font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
