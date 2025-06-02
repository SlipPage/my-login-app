import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(remember);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded bg-white p-6 shadow">
        <h1 className="mb-4 text-center text-2xl font-bold">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded border px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-3 w-full rounded border px-3 py-2"
          required
        />
        <div className="mb-3 flex items-center">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="remember" className="text-sm text-gray-700">
            Keep me logged in
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
