import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useAllOrders } from '@/hooks/useOrders';
import { OrdersTable } from '@/components/order/OrdersTable';
import OrderDetailView from '@/components/order/OrderDetailView';
import { OrderResponse } from '@/types/order';
import { Skeleton } from '@/components/ui/skeleton';

const AdminOrdersPage: React.FC = () => {
  const { data: orders, isLoading, isError, error } = useAllOrders();
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  const handleViewDetails = (orderId: string) => {
    const order = orders?.find((o) => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsDetailViewOpen(true);
    }
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setSelectedOrder(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">Manage Orders</h1>
            <Skeleton className="h-[500px] w-full" />
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
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">Manage Orders</h1>
            <p className="text-red-500">Error loading orders: {error?.message}</p>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Manage Orders</h1>
          <OrdersTable orders={orders ?? []} onViewDetails={handleViewDetails} />

          {selectedOrder && (
            <OrderDetailView
              order={selectedOrder}
              isOpen={isDetailViewOpen}
              onClose={handleCloseDetailView}
            />
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminOrdersPage;