import React from 'react';
import { CartItem, CartTotals, AdjustmentLine } from '@/cart/types';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryProps {
  cartItems: CartItem[];
  totals: CartTotals;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, totals }) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  return (
    <div className="space-y-4" data-testid="order-summary">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-2">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-gray-700">
            <span className="flex-1">
              {item.name} x {item.quantity}
            </span>
            <span className="font-medium">{formatCurrency(item.unitPrice * item.quantity)}</span>
          </div>
        ))}
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
        </div>

        {totals.adjustments.map((adjustment: AdjustmentLine) => (
          <div key={adjustment.id} className="flex justify-between text-gray-700">
            <span>{adjustment.label}</span>
            <span className="font-medium">{formatCurrency(adjustment.amount)}</span>
          </div>
        ))}

        <div className="flex justify-between text-lg font-bold mt-4">
          <span>Total</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>
    </div>
  );
};