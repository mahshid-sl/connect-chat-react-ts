import type { Session, User } from '@supabase/supabase-js';
import { createContext, useContext, type ReactNode } from 'react';
import useAuthListener from '../hooks/useAuthListener';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

// 1.initialState
const initialState: AuthContextType = {
  user: null,
  session: null,
  loading: true,
};

// 2.createContext
const AuthContext = createContext<AuthContextType | null>(initialState);

// 2.Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const value = useAuthListener();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
