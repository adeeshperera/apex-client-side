'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, AuthUser, RegisterData } from '../types';
import { authApi, tokenService } from '../lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = tokenService.getToken();
      const userData = localStorage.getItem('user');
      
      if (token && userData && tokenService.isTokenValid()) {
        try {
          setUser(JSON.parse(userData));
        } catch {
          tokenService.removeToken();
        }
      } else {
        tokenService.removeToken();
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userData = await authApi.login({ email, password });
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const newUser = await authApi.register(userData);
      localStorage.setItem('token', newUser.token);
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}