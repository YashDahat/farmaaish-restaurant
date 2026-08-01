import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/cart/CartContext';
import { CartTotals } from '@/cart/types';

interface OrderSummaryProps {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
}

export function OrderSummary({ customerName, customerPhone, deliveryAddress }: OrderSummaryProps) {
  const { cartItems, totals } = useCart();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="order-summary-card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Delivery Information</h3>
            <p>
              <span className="font-medium">Name:</span> {customerName}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {customerPhone}
            </p>
            <p>
              <span className="font-medium">Address:</span> {deliveryAddress}
            </p>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">Items</h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-gray-700">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-medium">{formatCurrency(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">Order Totals</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
              </div>
              {totals.adjustments.map((adj, index) => (
                <div key={index} className="flex justify-between text-sm text-gray-600">
                  <span>{adj.description}:</span>
                  <span>{formatCurrency(adj.amount)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total:</span>
                <span>{formatCurrency(totals.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}