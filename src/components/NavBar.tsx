import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
          alt="Tailwind Logo"
          className="h-8 w-8"
        />
        <span className="text-xl font-bold">Home</span>
      </div>

      <div className="space-x-4">
        {!user ? (
          <>
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              Sign In
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
