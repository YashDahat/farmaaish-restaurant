import { useSearchParams } from 'react-router-dom';
import { useOrder } from '@/hooks/useOrders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrderConfirmationPage(): React.ReactNode {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { data: order, isLoading, isError, error } = useOrder(orderId || '');

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="p-6">
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Separator className="my-4" />
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Separator className="my-4" />
              <Skeleton className="h-6 w-1/4" />
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Failed to load order details: {error?.message}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Order Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No order details could be found for the provided ID.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const formattedOrderDate = new Date(order.orderDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-[#800020]">
              Order Confirmed!
            </CardTitle>
            <p className="text-center text-gray-600 mt-2">
              Thank you for your order, {order.customerName}!
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Order Details</h3>
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Order Date:</strong> {formattedOrderDate}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Estimated Delivery:</strong> 45-60 minutes
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Delivery Information</h3>
                <p>
                  <strong>Customer Name:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Phone:</strong> {order.customerPhone}
                </p>
                <p>
                  <strong>Address:</strong> {order.deliveryAddress}
                </p>
                {order.notes && (
                  <p>
                    <strong>Notes:</strong> {order.notes}
                  </p>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            <h3 className="text-xl font-semibold mb-4">Items Ordered</h3>
            <div className="space-y-3">
              {order.orderItems.map((item) => (
                <div key={item.menuItemId} className="flex justify-between items-center">
                  <p className="text-gray-700">
                    {item.quantity} x {item.menuItemName} ({formatCurrency(item.unitPrice)})
                  </p>
                  <p className="font-medium">{formatCurrency(item.subTotal)}</p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between items-center text-xl font-bold text-[#800020]">
              <span>Total Amount:</span>
              <span>{formatCurrency(order.totalAmount)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}