import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/profile/`);
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      console.log('🔐 Attempting login for:', username);
      const response = await axios.post(`${API_URL}/api/auth/login/`, {
        username,
        password,
      });
      console.log('✅ Login response:', response.data);
      const { access, refresh, user: userData } = response.data;
      
      if (!access || !userData) {
        console.error('❌ Missing data in response:', { access: !!access, user: !!userData });
        throw new Error('Invalid response from server');
      }
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      setUser(userData);
      console.log('✅ Login successful, user set:', userData.username);
      return { success: true };
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('Error details:', error.response?.data);
      return { 
        success: false, 
        error: error.response?.data?.detail || error.message || 'Login failed' 
      };
    }
  };

  const register = async (username, email, password, password2, currency = 'USD') => {
    try {
      console.log('📝 Attempting registration for:', username);
      const response = await axios.post(`${API_URL}/api/auth/register/`, {
        username,
        email,
        password,
        password2,
        currency,
      });
      console.log('✅ Registration response:', response.data);
      const { access, refresh, user: userData } = response.data;
      
      if (!access || !userData) {
        console.error('❌ Missing data in response:', { access: !!access, user: !!userData });
        throw new Error('Invalid response from server');
      }
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      setUser(userData);
      console.log('✅ Registration successful, user set:', userData.username);
      return { success: true };
    } catch (error) {
      console.error('❌ Registration error:', error);
      console.error('Error details:', error.response?.data);
      return { 
        success: false, 
        error: error.response?.data || error.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
