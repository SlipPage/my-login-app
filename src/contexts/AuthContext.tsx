import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, keepLoggedIn: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, keepLoggedIn: boolean) => {
    // Simple fake validation
    if (email === 'test@tester.com' && password === 'admin1111') {
      const loggedInUser = { email, name: 'Tester' };
      setUser(loggedInUser);

      if (keepLoggedIn) {
        localStorage.setItem('authUser', JSON.stringify(loggedInUser));
      } else {
        sessionStorage.setItem('authUser', JSON.stringify(loggedInUser));
      }

      navigate('/'); // Redirect to homepage after login
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    sessionStorage.removeItem('authUser');
    navigate('/');
  };

  // On mount, load user from storage if exists
  React.useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem('authUser') || 'null') ||
      JSON.parse(sessionStorage.getItem('authUser') || 'null');
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
