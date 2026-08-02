import { useOrders } from '@/hooks/useOrders';
import { Order, OrderStatus } from '@/types/order';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersTable() {
  const { allOrders, isLoadingAllOrders, isErrorAllOrders, updateOrderStatus } = useOrders();

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, {
      onSuccess: () => {
        toast.success(`Order ${orderId} status updated to ${newStatus}`);
      },
      onError: (error) => {
        toast.error(`Failed to update order status: ${error.message}`);
      },
    });
  };

  if (isLoadingAllOrders) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isErrorAllOrders) {
    return <div className="text-red-500">Error loading orders.</div>;
  }

  if (!allOrders || allOrders.length === 0) {
    return <div className="text-gray-500">No orders found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table data-testid="orders-table">
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allOrders.map((order) => (
            <TableRow key={order.id} data-testid={`order-row-${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customerId ?? 'N/A'}</TableCell>
              <TableCell>
                {order.orderDate
                  ? new Date(order.orderDate).toLocaleDateString('en-IN')
                  : 'N/A'}
              </TableCell>
              <TableCell>
                {order.totalAmount?.toLocaleString('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                }) ?? 'N/A'}
              </TableCell>
              <TableCell>
                <Select
                  value={order.status ?? ''}
                  onValueChange={(value: OrderStatus) => handleStatusChange(order.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING_PAYMENT">Pending Payment</SelectItem>
                    <SelectItem value="RECEIVED">Received</SelectItem>
                    <SelectItem value="PREPARING">Preparing</SelectItem>
                    <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(order.id, order.status as OrderStatus)}
                  data-testid={`update-status-button-${order.id}`}
                >
                  Update Status
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}