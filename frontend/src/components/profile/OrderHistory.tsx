import { useAllOrders } from '@/hooks/useOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const OrderHistory = () => {
  const { data: orders, isLoading, isError, error } = useAllOrders();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error loading orders: {error?.message}</div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-700">You haven't placed any orders yet. Explore our exquisite menu!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order) => (
        <Card key={order.id} className="p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Order ID: {order.id?.substring(0, 8)}</CardTitle>
            <p className="text-sm text-gray-500">
              Order Date: {order.createdAt ? format(new Date(order.createdAt), 'dd/MM/yyyy') : 'N/A'}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-[#D4AF37] mb-2">
              Total Amount: {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(order.totalAmount ?? 0)}
            </p>
            <p className="text-gray-700 mb-4">Status: {order.status}</p>
            <h4 className="font-medium mb-2">Items:</h4>
            <ul className="list-disc list-inside text-gray-600">
              {order.orderItems?.map((item) => (
                <li key={item.id}>
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderHistory;