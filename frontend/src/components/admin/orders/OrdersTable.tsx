import { useState } from 'react';
import { OrderResponse, OrderStatus } from '@/types/order';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface OrdersTableProps {
  orders: OrderResponse[];
  onViewDetails: (order: OrderResponse) => void;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export default function OrdersTable({ orders, onViewDetails, onUpdateStatus }: OrdersTableProps): JSX.Element {
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'ALL'>('ALL');

  const filteredOrders = orders.filter(order =>
    filterStatus === 'ALL' ? true : order.status === filterStatus
  );

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={filterStatus} onValueChange={(value: OrderStatus | 'ALL') => setFilterStatus(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="CONFIRMED">Confirmed</SelectItem>
            <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table data-testid="orders-table">
          <TableHeader className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id} data-testid={`order-row-${order.id}`}>
                  <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                  <TableCell>{order.customerId.substring(0, 8)}...</TableCell>
                  <TableCell>{formatDate(order.orderDate)}</TableCell>
                  <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(order)}
                      className="mr-2"
                      data-testid={`view-details-${order.id}`}
                    >
                      View Details
                    </Button>
                    <Select
                      value={order.status}
                      onValueChange={(newStatus: OrderStatus) => onUpdateStatus(order.id, newStatus)}
                    >
                      <SelectTrigger className="w-[140px]" data-testid={`update-status-trigger-${order.id}`}>
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {['PENDING', 'CONFIRMED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].map((status) => (
                          <SelectItem key={status} value={status} data-testid={`status-option-${order.id}-${status}`}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}