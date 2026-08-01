import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { OrdersTable } from '@/components/admin/orders/OrdersTable';
import { OrderDetailView } from '@/components/admin/orders/OrderDetailView';
import { useAllOrders } from '@/hooks/useOrders';
import { OrderResponse } from '@/types/order';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminOrdersPage() {
  const { data: orders, isLoading, isError } = useAllOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);

  const handleViewDetails = (order: OrderResponse) => {
    setSelectedOrder(order);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#36454F] mb-6">Manage Orders</h1>
            <Skeleton className="h-[400px] w-full" />
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#36454F] mb-6">Manage Orders</h1>
            <p className="text-red-500">Error loading orders.</p>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#36454F] mb-6" data-testid="admin-orders-title">Manage Orders</h1>
          <OrdersTable orders={orders || []} onViewDetails={handleViewDetails} />
          {selectedOrder && (
            <OrderDetailView order={selectedOrder} onClose={handleCloseDetails} />
          )}
        </div>
      </section>
    </AdminLayout>
  );
}