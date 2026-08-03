import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { OrderResponse, OrderStatus } from '@/types/order';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUpdateOrderStatus } from '@/hooks/useOrders';
import { toast } from 'sonner';

interface OrdersTableProps {
  orders: OrderResponse[];
}

const statusOptions: OrderStatus[] = [
  'PENDING_PAYMENT',
  'RECEIVED',
  'IN_PROGRESS',
  'READY_FOR_DELIVERY',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED',
];

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }): React.JSX.Element => {
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const handleStatusChange = (orderId: number, newStatus: OrderStatus): void => {
    updateOrderStatusMutation.mutate(
      { orderId: orderId.toString(), status: newStatus },
      {
        onSuccess: () => {
          toast.success(`Order ${orderId} status updated to ${newStatus}`);
        },
        onError: (error) => {
          toast.error(`Failed to update order status: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} data-testid={`order-row-${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                {order.totalAmount.toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                })}
              </TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value: OrderStatus) =>
                    handleStatusChange(order.id, value)
                  }
                  data-testid={`order-status-select-${order.id}`}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;