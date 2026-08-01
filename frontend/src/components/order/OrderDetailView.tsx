import { useState } from 'react';
import { OrderResponse, OrderStatus, OrderItem } from '@/types/order';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from '@/services/orderService';
import { toast } from 'sonner';

interface OrderDetailViewProps {
  order: OrderResponse;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailView: React.FC<OrderDetailViewProps> = ({ order, isOpen, onClose }) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order.orderStatus ?? 'PENDING_PAYMENT');
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus: OrderStatus) => {
      if (!order.id) {
        return Promise.reject(new Error('Order ID is missing.'));
      }
      return updateOrderStatus(order.id); // The backend API doesn't take status as a parameter for updateOrderStatus
    },
    onSuccess: () => {
      toast.success('Order status updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to update order status: ${error.message}`);
    },
  });

  const handleStatusChange = (value: string) => {
    setCurrentStatus(value as OrderStatus);
  };

  const handleSaveStatus = () => {
    updateStatusMutation.mutate(currentStatus);
  };

  if (!order) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle data-testid="order-detail-title">Order Details (ID: {order.id ?? 'N/A'})</DialogTitle>
          <DialogDescription>View and update the status of this order.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="customerName" className="text-right">Customer Name:</Label>
            <span id="customerName" data-testid="order-customer-name">{order.customerName ?? 'N/A'}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="customerEmail" className="text-right">Customer Email:</Label>
            <span id="customerEmail" data-testid="order-customer-email">{order.customerEmail ?? 'N/A'}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="customerPhone" className="text-right">Customer Phone:</Label>
            <span id="customerPhone" data-testid="order-customer-phone">{order.customerPhone ?? 'N/A'}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="deliveryAddress" className="text-right">Delivery Address:</Label>
            <span id="deliveryAddress" data-testid="order-delivery-address">{order.deliveryAddress ?? 'N/A'}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="totalAmount" className="text-right">Total Amount:</Label>
            <span id="totalAmount" data-testid="order-total-amount">₹{(order.totalAmount ?? 0).toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="paymentTransactionId" className="text-right">Payment ID:</Label>
            <span id="paymentTransactionId" data-testid="order-payment-id">{order.paymentTransactionId ?? 'N/A'}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="orderStatus" className="text-right">Order Status:</Label>
            <Select value={currentStatus} onValueChange={handleStatusChange} data-testid="order-status-select">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING_PAYMENT">Pending Payment</SelectItem>
                <SelectItem value="PENDING_PAYMENT_VERIFICATION">Pending Payment Verification</SelectItem>
                <SelectItem value="RECEIVED">Received</SelectItem>
                <SelectItem value="PREPARING">Preparing</SelectItem>
                <SelectItem value="READY_FOR_DELIVERY">Ready for Delivery</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator className="my-4" />

          <h3 className="text-lg font-semibold">Order Items</h3>
          {order.orderItems && order.orderItems.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.orderItems.map((item: OrderItem) => (
                  <TableRow key={item.id} data-testid="order-item-row">
                    <TableCell>{item.menuItemName ?? 'N/A'}</TableCell>
                    <TableCell>{item.quantity ?? 0}</TableCell>
                    <TableCell className="text-right">₹{(item.unitPrice ?? 0).toFixed(2)}</TableCell>
                    <TableCell className="text-right">₹{((item.quantity ?? 0) * (item.unitPrice ?? 0)).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No items in this order.</p>
          )}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-testid="order-detail-cancel-button"
          >
            Close
          </Button>
          <Button
            type="submit"
            onClick={handleSaveStatus}
            disabled={updateStatusMutation.isPending}
            data-testid="order-detail-save-button"
            className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200"
          >
            {updateStatusMutation.isPending ? 'Saving...' : 'Save Status'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailView;