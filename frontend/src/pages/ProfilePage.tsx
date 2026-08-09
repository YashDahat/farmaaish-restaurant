import ProfileDetails from '@/components/profile/ProfileDetails';
import OrderHistory from '@/components/profile/OrderHistory';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTES } from '@/routes';

export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(ROUTES.LOGIN);
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || !isAuthenticated) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">Loading Profile...</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10 text-center" data-testid="profile-page-title">
          Your Farmaaish Profile
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProfileDetails />
          <OrderHistory />
        </div>
      </div>
    </section>
  );
}