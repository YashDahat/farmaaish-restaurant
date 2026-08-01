import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OrderResponse, OrderStatus } from '@/types/order';
import { useUpdateOrderStatus } from '@/hooks/useOrders';
import { useState, useEffect } from 'react';

interface OrderDetailViewProps {
  order: OrderResponse | null;
  onClose: () => void;
}

const OrderDetailView: React.FC<OrderDetailViewProps> = ({ order, onClose }) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus | string>(order?.status ?? '');
  const updateOrderStatusMutation = useUpdateOrderStatus();

  useEffect(() => {
    if (order?.status) {
      setCurrentStatus(order.status);
    }
  }, [order]);

  const handleStatusChange = (newStatus: OrderStatus) => {
    setCurrentStatus(newStatus);
  };

  const handleUpdateStatus = () => {
    if (order?.id && currentStatus && currentStatus !== order.status) {
      updateOrderStatusMutation.mutate(order.id);
    }
    onClose();
  };

  if (!order) {
    return null;
  }

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '₹0.00';
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#36454F]">Order Details (ID: {order.id ?? 'N/A'})</DialogTitle>
          <DialogDescription className="text-gray-600">
            View and update the status of this order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right font-medium text-[#36454F]">
              Customer Name
            </Label>
            <span id="customerName" className="col-span-3 text-gray-800">
              {order.customerName ?? 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerPhone" className="text-right font-medium text-[#36454F]">
              Phone
            </Label>
            <span id="customerPhone" className="col-span-3 text-gray-800">
              {order.customerPhone ?? 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="deliveryAddress" className="text-right font-medium text-[#36454F]">
              Delivery Address
            </Label>
            <span id="deliveryAddress" className="col-span-3 text-gray-800">
              {order.deliveryAddress ?? 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalAmount" className="text-right font-medium text-[#36454F]">
              Total Amount
            </Label>
            <span id="totalAmount" className="col-span-3 text-gray-800">
              {formatCurrency(order.totalAmount)}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="createdAt" className="text-right font-medium text-[#36454F]">
              Order Date
            </Label>
            <span id="createdAt" className="col-span-3 text-gray-800">
              {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right font-medium text-[#36454F]">
              Status
            </Label>
            <Select onValueChange={handleStatusChange} value={currentStatus} data-testid="order-status-select">
              <SelectTrigger className="col-span-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]">
                <SelectValue placeholder="Select status" />
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
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-[#36454F] mb-2">Order Items</h3>
            {order.orderItems && order.orderItems.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.orderItems.map((item, index) => (
                      <tr key={item.id ?? index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{item.name ?? 'N/A'}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{item.quantity ?? 0}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{formatCurrency(item.unitPrice)}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-800">{formatCurrency((item.quantity ?? 0) * (item.unitPrice ?? 0))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No items in this order.</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-[#36454F] hover:bg-[#2a353c] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200"
            data-testid="order-detail-close-button"
          >
            Close
          </Button>
          <Button
            type="submit"
            onClick={handleUpdateStatus}
            disabled={updateOrderStatusMutation.isPending || currentStatus === order.status}
            className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200"
            data-testid="order-detail-update-status-button"
          >
            {updateOrderStatusMutation.isPending ? 'Updating...' : 'Update Status'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailView;