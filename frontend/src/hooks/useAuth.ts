import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

type AuthContextType = NonNullable<React.ContextType<typeof AuthContext>>;

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};