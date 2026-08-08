import type { JSX } from 'react';
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import OrdersTable from '@/components/admin/orders/OrdersTable';
import OrderDetailsModal from '@/components/admin/orders/OrderDetailsModal';
import { useAllOrders, useUpdateOrderStatus } from '@/hooks/useOrders';
import { OrderResponse, OrderStatus, UpdateOrderStatusRequest } from '@/types/order';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function AdminOrdersPage(): JSX.Element {
  const { orders, isLoading, isError, error } = useAllOrders();
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateOrderStatus();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);

  const handleViewDetails = (order: OrderResponse): void => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus): void => {
    const request: UpdateOrderStatusRequest = { newStatus };
    updateStatus(
      { orderId, request },
      {
        onSuccess: () => {
          toast.success(`Order ${orderId.substring(0, 8)}... status updated to ${newStatus}`);
          if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
          }
        },
        onError: (err) => {
          toast.error(`Failed to update order status: ${err.message}`);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-4 p-6">
          <h1 className="text-3xl font-bold">Manage Orders</h1>
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="p-6 text-red-500">
          Error loading orders: {error?.message || 'Unknown error'}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        <h1 className="text-3xl font-bold" data-testid="admin-orders-title">Manage Orders</h1>
        {orders && orders.length > 0 ? (
          <OrdersTable
            orders={orders}
            onViewDetails={handleViewDetails}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">No orders found.</div>
        )}

        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
          onUpdateStatus={handleUpdateOrderStatus}
          isLoading={isUpdatingStatus}
        />
      </div>
    </AdminLayout>
  );
}