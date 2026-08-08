import type { JSX } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useMyOrders } from '@/hooks/useOrders';
import OrderHistoryTable from '@/components/profile/OrderHistoryTable';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage(): JSX.Element {
  const { user, isAuthenticated } = useAuth();
  const { orders, isLoading, isError, error } = useMyOrders();

  if (!isAuthenticated) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center" data-testid="profile-page-title">
          My Profile
        </h1>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8" data-testid="profile-details-card">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h2>
          {user ? (
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Username:</span> {user.username}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {user.email}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-6 w-64" />
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6" data-testid="order-history-card">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : isError ? (
            <p className="text-red-500">Error loading orders: {error?.message}</p>
          ) : (
            <OrderHistoryTable orders={orders ?? []} />
          )}
        </div>
      </div>
    </section>
  );
}