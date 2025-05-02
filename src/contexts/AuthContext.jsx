import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [role, setRole] = useState(localStorage.getItem('role') || null);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
      setUserId(localStorage.getItem('userId'));
      setRole(localStorage.getItem('role'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (data) => {
    setToken(data.token);
    setUserId(data.userId);
    setRole(data.role);

    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('role', data.role);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setRole(null);

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ userId, role, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};