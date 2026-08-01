import React from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useAllOrders } from '@/hooks/useOrders';
import OrderHistoryList from '@/components/order/OrderHistoryList';
import { Skeleton } from '@/components/ui/skeleton';

const OrderHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const { data: orders, isLoading, isError, error } = useAllOrders();

  if (!user) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-4">Order History</h1>
            <p className="text-lg text-gray-600">Please log in to view your order history.</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-8 text-center">Your Order History</h1>

          {isLoading && (
            <div className="space-y-6">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          )}

          {isError && (
            <div className="text-center py-8">
              <p className="text-lg text-red-600">Error loading orders: {error?.message}</p>
              <p className="text-md text-gray-500">Please try again later.</p>
            </div>
          )}

          {!isLoading && !isError && orders && <OrderHistoryList orders={orders} />}
        </div>
      </section>
    </Layout>
  );
};

export default OrderHistoryPage;