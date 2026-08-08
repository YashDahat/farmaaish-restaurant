import type { JSX } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrderResponse, OrderStatus } from '@/types/order';
import { Separator } from '@/components/ui/separator';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderResponse | null;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  isLoading: boolean;
}

export default function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
  isLoading,
}: OrderDetailsModalProps): JSX.Element {
  if (!order) {
    return <></>;
  }

  const handleStatusChange = (newStatus: OrderStatus): void => {
    onUpdateStatus(order.id, newStatus);
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle data-testid="order-details-title">Order Details (ID: {order.id})</DialogTitle>
          <DialogDescription>
            View and manage the details of this customer order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <p className="text-sm font-medium">Order Date:</p>
            <p className="text-sm text-gray-700">{new Date(order.orderDate).toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <p className="text-sm font-medium">Delivery Address:</p>
            <p className="text-sm text-gray-700">{order.deliveryAddress}</p>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <p className="text-sm font-medium">Contact Phone:</p>
            <p className="text-sm text-gray-700">{order.contactPhone}</p>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <p className="text-sm font-medium">Current Status:</p>
            <Select onValueChange={(value: OrderStatus) => handleStatusChange(value)} value={order.status} disabled={isLoading}>
              <SelectTrigger className="w-[180px]" data-testid="order-status-select">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {['PENDING', 'CONFIRMED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].map((status) => (
                  <SelectItem key={status} value={status} data-testid={`order-status-option-${status.toLowerCase()}`}>
                    {status.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          <h3 className="text-lg font-semibold">Order Items</h3>
          {order.orderItems.length === 0 ? (
            <p className="text-sm text-gray-500">No items in this order.</p>
          ) : (
            <div className="space-y-2">
              {order.orderItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span>{item.menuItemName} (x{item.quantity})</span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          )}

          <Separator className="my-4" />

          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount:</span>
            <span data-testid="order-total-amount">{formatCurrency(order.totalAmount)}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} data-testid="order-details-close-button">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}