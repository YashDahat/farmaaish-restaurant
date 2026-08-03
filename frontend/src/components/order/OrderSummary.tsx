import { CartItem, CartTotals, AdjustmentLine } from '@/cart/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryProps {
  cartItems: CartItem[];
  totals: CartTotals;
}

export default function OrderSummary({ cartItems, totals }: OrderSummaryProps): JSX.Element {
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  return (
    <Card className="w-full" data-testid="order-summary-card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} x {formatCurrency(item.unitPrice)}
                </p>
              </div>
              <p className="font-medium">{formatCurrency(item.quantity * item.unitPrice)}</p>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Subtotal:</span>
            <span>{formatCurrency(totals.subtotal)}</span>
          </div>
          {totals.adjustments.map((adj: AdjustmentLine) => (
            <div key={adj.id} className="flex justify-between text-sm text-gray-700">
              <span>{adj.label}:</span>
              <span>{formatCurrency(adj.amount)}</span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}