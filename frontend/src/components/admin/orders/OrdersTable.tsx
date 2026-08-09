import type { JSX } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { toast } from 'sonner';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OrderDto, OrderStatus } from '@/types/order';
import { getAllOrders, updateOrderStatus } from '@/services/orderService';
import { Skeleton } from '@/components/ui/skeleton';

interface OrdersTableProps {
  orders: OrderDto[];
}

export default function OrdersTable(): React.JSX.Element {
  const queryClient = useQueryClient();
  const { data: orders, isLoading, isError, error } = useQuery<OrderDto[], Error>({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });

  const updateStatusMutation = useMutation<OrderDto, Error, { orderId: string; status: OrderStatus }>({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId), // The API only supports updating status to the next logical step, not arbitrary status.
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated successfully!');
    },
    onError: (err) => {
      toast.error(`Failed to update order status: ${err.message}`);
    },
  });

  const handleUpdateStatus = (orderId: string, currentStatus: OrderStatus): void => {
    // Determine the next logical status based on the current status
    let nextStatus: OrderStatus;
    switch (currentStatus) {
      case 'PENDING_PAYMENT':
        nextStatus = 'RECEIVED';
        break;
      case 'RECEIVED':
        nextStatus = 'PREPARING';
        break;
      case 'PREPARING':
        nextStatus = 'OUT_FOR_DELIVERY';
        break;
      case 'OUT_FOR_DELIVERY':
        nextStatus = 'DELIVERED';
        break;
      case 'DELIVERED':
        toast.info('Order is already delivered.');
        return;
      case 'CANCELLED':
        toast.info('Order is cancelled and cannot be updated.');
        return;
      default:
        toast.error('Unknown order status.');
        return;
    }
    updateStatusMutation.mutate({ orderId, status: nextStatus });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error: {error?.message}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div className="text-center py-8 text-gray-500">No orders found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table data-testid="orders-table">
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} data-testid={`order-row-${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.userId}</TableCell>
              <TableCell>
                {order.orderItems.map((item, index) => (
                  <div key={index}>
                    {item.menuItemName} (x{item.quantity}) -{' '}
                    {item.subTotal.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {order.totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{format(new Date(order.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" data-testid={`order-status-dropdown-${order.id}`}>
                      Update Status
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleUpdateStatus(order.id, order.status)}
                      disabled={updateStatusMutation.isPending}
                      data-testid={`order-update-status-button-${order.id}`}
                    >
                      Next Status
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}