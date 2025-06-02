import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 flex items-center justify-between">
      {/* Left side: logo + Home */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
          alt="Tailwind Logo"
          className="h-8 w-auto"
        />
        <span className="text-white font-semibold text-lg">Home</span>
      </Link>

      {/* Right side: Login button */}
      <Link
        to="/login"
        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-100"
      >
        Login
      </Link>
    </nav>
  );
};

export default Navbar;
