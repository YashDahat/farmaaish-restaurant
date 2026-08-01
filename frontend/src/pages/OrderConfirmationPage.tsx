import { useSearchParams } from 'react-router-dom';
import { useCustomerOrderById } from '@/hooks/useOrders';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const OrderConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { data: order, isLoading, isError, error } = useCustomerOrderById(orderId || '');

  if (!orderId) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Not Found</h1>
            <p className="text-gray-600">No order ID was provided. Please check your link.</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="p-6">
              <CardHeader>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Separator className="my-4" />
                <Skeleton className="h-6 w-1/3 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Separator className="my-4" />
                <Skeleton className="h-6 w-1/4" />
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Error</h1>
            <p className="text-red-600">Failed to load order details: {error?.message}</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Not Found</h1>
            <p className="text-gray-600">The order with ID "{orderId}" could not be found.</p>
          </div>
        </section>
      </Layout>
    );
  }

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '₹0.00';
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  return (
    <Layout>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-[#800020] mb-2">Order Confirmed!</CardTitle>
              <p className="text-lg text-gray-700">Thank you for your order, {order.customerName ?? 'customer'}!</p>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Order Details</h2>
                <p className="text-gray-700 mb-1">
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Status:</strong> {order.status}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Order Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>

              <Separator className="my-6" />

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Items Ordered</h3>
                {order.orderItems && order.orderItems.length > 0 ? (
                  <ul className="space-y-2">
                    {order.orderItems.map((item) => (
                      <li key={item.id} className="flex justify-between items-center text-gray-700">
                        <span>
                          {item.quantity} x {item.name}
                        </span>
                        <span>{formatCurrency((item.unitPrice ?? 0) * (item.quantity ?? 0))}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No items found for this order.</p>
                )}
              </div>

              <Separator className="my-6" />

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Delivery Information</h3>
                <p className="text-gray-700 mb-1">
                  <strong>Customer Name:</strong> {order.customerName}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Phone:</strong> {order.customerPhone}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Delivery Address:</strong> {order.deliveryAddress}
                </p>
              </div>

              <Separator className="my-6" />

              <div className="text-right">
                <p className="text-2xl font-bold text-[#D4AF37]">
                  Total: {formatCurrency(order.totalAmount)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default OrderConfirmationPage;