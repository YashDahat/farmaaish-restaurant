import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
}

export default function ProtectedRoute({ children, roles }: ProtectedRouteProps): ReactNode {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated loading spinner/skeleton
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (roles && user && !roles.some(role => user.roles.includes(role))) {
    // Redirect to a 403 Forbidden page or home page
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
}