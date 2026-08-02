import { useOrders } from '@/hooks/useOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrderHistoryList() {
  const { customerOrders, isLoadingCustomerOrders, isErrorCustomerOrders, customerOrdersError } = useOrders();

  if (isLoadingCustomerOrders) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (isErrorCustomerOrders) {
    return <div className="text-red-500">Error loading orders: {customerOrdersError?.message}</div>;
  }

  if (!customerOrders || customerOrders.length === 0) {
    return <div className="text-gray-600">No past orders found.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-[#36454F]">Order History</h2>
      {customerOrders.map((order) => (
        <Card key={order.id} className="shadow-md border border-gray-100" data-testid={`order-card-${order.id}`}>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl text-[#36454F]">
              Order ID: {order.id?.substring(0, 8)}...
            </CardTitle>
            <p className="text-sm text-gray-500">
              Date: {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Total Amount:</p>
                <p className="text-[#D4AF37] text-lg font-bold">
                  {order.totalAmount?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) ?? '₹0.00'}
                </p>
              </div>
              <div>
                <p className="font-medium">Status:</p>
                <p className={`font-semibold ${order.status === 'DELIVERED' ? 'text-green-600' : 'text-orange-500'}`}>
                  {order.status ?? 'N/A'}
                </p>
              </div>
              {order.deliveryAddress && (
                <div className="col-span-full">
                  <p className="font-medium">Delivery Address:</p>
                  <p>{order.deliveryAddress}</p>
                </div>
              )}
              {order.contactPhone && (
                <div className="col-span-full">
                  <p className="font-medium">Contact Phone:</p>
                  <p>{order.contactPhone}</p>
                </div>
              )}
            </div>
            {/* Order Items are not directly available in the Order DTO, so we omit them as per contract */}
            {/* <Separator className="my-4" />
            <h3 className="text-md font-semibold mb-2">Items:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {order.orderItems?.map((item, index) => (
                <li key={index}>
                  {item.quantity} x {item.menuItemName} -{' '}
                  {(item.unitPrice * item.quantity).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </li>
              ))}
            </ul> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}