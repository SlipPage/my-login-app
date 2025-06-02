import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sun, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    // Initialize dark mode based on localStorage or system preference
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('darkMode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#1f2937'; // Tailwind gray-900
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f3f4f6'; // Tailwind gray-100
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="flex items-center justify-between bg-blue-600 p-4 text-white dark:bg-gray-900">
      <div className="flex items-center space-x-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
          alt="Logo"
          className="h-8"
        />
        <Link to="/" className="text-xl font-bold hover:text-gray-200">
          Home
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {/* Login / User menu */}
        {!user ? (
          <Link
            to="/login"
            className="rounded bg-white px-4 py-2 text-blue-600 hover:bg-gray-100"
          >
            Login / Sign Up
          </Link>
        ) : (
          <div className="relative group">
            <button className="rounded bg-white px-4 py-2 text-blue-600 hover:bg-gray-100">
              {user.name}
            </button>
            <div className="absolute right-0 mt-2 hidden w-32 rounded bg-white py-2 shadow-lg group-hover:block dark:bg-gray-700">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Log Out
              </button>
            </div>
          </div>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className={`rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600 ${
            darkMode
              ? 'bg-gray-700 text-yellow-300'
              : 'bg-white text-blue-600'
          }`}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
