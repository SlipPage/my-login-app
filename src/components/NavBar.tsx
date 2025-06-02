import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <div className="flex items-center space-x-2">
        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind" className="h-8 w-8" />
        <Link to="/" className="text-lg font-bold">Home</Link>
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={logout} className="rounded bg-red-500 px-4 py-2 hover:bg-red-600">
            Log Out
          </button>
        ) : (
          <Link to="/login" className="rounded bg-blue-500 px-4 py-2 hover:bg-blue-600">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
