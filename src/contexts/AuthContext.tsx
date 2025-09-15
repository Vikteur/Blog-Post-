import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
interface User {
  name: string;
  email: string;
  avatar?: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({
  children
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const logout = () => {
    setUser(null);
  };
  const value = {
    user,
    isAuthenticated: !!user,
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