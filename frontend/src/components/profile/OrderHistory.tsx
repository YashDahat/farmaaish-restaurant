import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderDto } from '@/types/order';

export default function OrderHistory() {
  const { user } = useAuth();
  const { createOrder, isCreatingOrder, createOrderError, createdOrder } = useOrders(); // Assuming useOrders will eventually provide a way to fetch orders

  // Placeholder for fetching orders for the current user.
  // In a real application, useOrders would have a query for this.
  const userOrders: OrderDto[] = []; // Replace with actual data fetching

  const isLoadingOrders = false; // Replace with actual loading state
  const hasOrders = userOrders && userOrders.length > 0;

  if (!user) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Please log in to view your order history.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full" data-testid="order-history-card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoadingOrders ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : hasOrders ? (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <div key={order.id} className="border p-4 rounded-lg shadow-sm" data-testid={`order-item-${order.id}`}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-medium">Order ID: {order.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-700 mb-1">
                  Total Amount: {order.totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </p>
                <p className="text-gray-500 text-sm">
                  Ordered On: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <Separator className="my-3" />
                <div className="space-y-2">
                  <h4 className="font-medium">Items:</h4>
                  {order.orderItems.map((item, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      {item.quantity} x {item.menuItemName} -{' '}
                      {(item.quantity * item.subTotal).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600" data-testid="no-orders-message">You have no past orders.</p>
        )}
      </CardContent>
    </Card>
  );
}