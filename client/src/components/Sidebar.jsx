import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Community', href: '/dashboard/community', icon: '👥' },
    { name: 'Tasks', href: '/dashboard/tasks', icon: '✅' },
    { name: 'Resume', href: '/dashboard/resume', icon: '📄' },
    { name: 'Profile', href: '/dashboard/profile', icon: '👤' },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getLevelFromXP = (xp) => {
    return Math.floor(xp / 100) + 1;
  };

  const getProgressToNextLevel = (xp) => {
    return xp % 100;
  };

  return (
    <div className="w-64 bg-white border-r border-secondary-200 flex flex-col h-full">
      {/* User Profile Section */}
      <div className="p-6 border-b border-secondary-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-xl">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <h3 className="font-semibold text-secondary-800">{user?.name}</h3>
          <p className="text-sm text-secondary-600">{user?.email}</p>
          
          {/* XP Level Display */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-secondary-600">Level {getLevelFromXP(user?.xp_level || 0)}</span>
              <span className="text-primary-600 font-medium">{user?.xp_level || 0} XP</span>
            </div>
            <div className="w-full bg-secondary-200 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressToNextLevel(user?.xp_level || 0)}%` }}
              ></div>
            </div>
            <p className="text-xs text-secondary-500 mt-1">
              {getProgressToNextLevel(user?.xp_level || 0)}% to next level
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={`sidebar-item ${
                  isActive(item.href) ? 'sidebar-item.active' : ''
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-secondary-200">
        <Link
          to="/career-options"
          className="sidebar-item mb-2"
        >
          <span className="text-lg">🎯</span>
          <span>Career Options</span>
        </Link>
        
        <button
          onClick={() => {
            // Handle logout
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
          className="sidebar-item text-red-600 hover:bg-red-50"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
