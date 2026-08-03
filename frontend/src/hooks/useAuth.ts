import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { LoginRequest } from '@/types/auth';

interface AuthController {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): AuthController => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return {
    isAuthenticated: context.isAuthenticated,
    token: context.token,
    isLoading: context.isLoading,
    login: context.login,
    logout: context.logout,
  };
};