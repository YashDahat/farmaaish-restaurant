import { OrderResponse } from '@/types/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface OrderHistoryListProps {
  orders: OrderResponse[];
}

const OrderHistoryList: React.FC<OrderHistoryListProps> = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-600">No orders found.</p>
        <p className="text-md text-gray-500">Start by placing an order from our menu!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id} data-testid={`order-card-${order.id}`}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Order #{order.id?.substring(0, 8)}</span>
              <span className="text-sm font-normal text-gray-500">
                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Status:</span> {order.orderStatus ?? 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Total:</span>{' '}
                  {order.totalAmount?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) ?? '₹0.00'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Customer:</span> {order.customerName ?? 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Delivery Address:</span> {order.deliveryAddress ?? 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Email:</span> {order.customerEmail ?? 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Phone:</span> {order.customerPhone ?? 'N/A'}
                </p>
              </div>
            </div>
            {order.orderItems && order.orderItems.length > 0 && (
              <>
                <Separator className="my-4" />
                <h4 className="font-semibold text-md mb-2">Items:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {order.orderItems.map((item) => (
                    <li key={item.id} className="text-sm text-gray-700">
                      {item.quantity} x {item.menuItemName} (
                      {item.unitPrice?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) ?? '₹0.00'}{' '}
                      each)
                    </li>
                  ))}
                </ul>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderHistoryList;