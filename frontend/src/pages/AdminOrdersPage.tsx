import AdminLayout from '@/components/AdminLayout';
import OrdersTable from '@/components/order/OrdersTable';
import { useAllOrders } from '@/hooks/useOrders';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderResponse } from '@/types/order';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AdminOrdersPage: React.FC = (): React.JSX.Element => {
  const { data: orders, isLoading, isError, error } = useAllOrders();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredOrders: OrderResponse[] = orders?.filter(order => {
    if (filterStatus === 'ALL') {
      return true;
    }
    return order.status === filterStatus;
  }) || [];

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="text-red-500">Error loading orders: {error?.message}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

          <div className="mb-4 flex items-center space-x-2">
            <label htmlFor="status-filter" className="text-sm font-medium">Filter by Status:</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="PENDING_PAYMENT">Pending Payment</SelectItem>
                <SelectItem value="RECEIVED">Received</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="READY_FOR_DELIVERY">Ready for Delivery</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="REFUNDED">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredOrders.length > 0 ? (
            <OrdersTable orders={filteredOrders} />
          ) : (
            <div className="text-center py-8 text-gray-500">No orders found.</div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminOrdersPage;