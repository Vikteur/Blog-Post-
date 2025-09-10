import React, { useState, createContext, useContext } from 'react';
interface User {
  name: string;
  email: string;
  avatar?: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  // Simple mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would validate against a backend
    // For demo purposes, we'll accept any non-empty values
    if (email && password) {
      // Mock successful login
      setUser({
        name: email.split('@')[0],
        email,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
      });
      return true;
    }
    return false;
  };
  const logout = () => {
    setUser(null);
  };
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}