import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { OrderResponse } from '@/types/order';

interface OrdersTableProps {
  orders: OrderResponse[];
  onViewDetails: (orderId: string) => void;
}

export function OrdersTable({ orders, onViewDetails }: OrdersTableProps) {
  return (
    <div className="rounded-md border">
      <Table data-testid="orders-table">
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} data-testid="order-row">
                <TableCell>{order.customerName ?? 'N/A'}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(order.totalAmount ?? 0)}
                </TableCell>
                <TableCell>{order.orderStatus ?? 'N/A'}</TableCell>
                <TableCell>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(order.id!)}
                    data-testid={`view-details-button-${order.id}`}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}