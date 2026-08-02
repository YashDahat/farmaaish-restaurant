import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
    } else if (requiredRole && user?.role !== requiredRole) {
      // Redirect to home or an unauthorized page if role doesn't match
      navigate(ROUTES.HOME);
    }
  }, [isAuthenticated, user, requiredRole, navigate]);

  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null; // Render nothing while redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;