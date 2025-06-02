import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (remember: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check both localStorage and sessionStorage
    const storedLogin = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (remember: boolean) => {
    setIsLoggedIn(true);
    if (remember) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      sessionStorage.setItem('isLoggedIn', 'true');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
