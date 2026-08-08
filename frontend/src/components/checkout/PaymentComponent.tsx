import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateOrder } from '@/hooks/useOrders';
import type { CartItem } from '@/cart/types';
import type { OrderItemRequest } from '@/types/order';
import { toast } from 'sonner';

interface PaymentComponentProps {
  totalAmount: number;
  orderItems: CartItem[];
  deliveryAddress: string;
  contactPhone: string;
  onOrderSuccess: (orderId: string) => void;
}

export default function PaymentComponent({
  totalAmount,
  orderItems,
  deliveryAddress,
  contactPhone,
  onOrderSuccess,
}: PaymentComponentProps): JSX.Element {
  const { mutateAsync: createOrder, isPending } = useCreateOrder();

  const handlePlaceOrder = async (): Promise<void> => {
    const items: OrderItemRequest[] = orderItems.map((item) => ({
      menuItemId: item.id.toString(),
      quantity: item.quantity,
    }));

    try {
      const order = await createOrder({
        orderItems: items,
        deliveryAddress,
        contactPhone,
      });
      toast.success('Order placed successfully!');
      onOrderSuccess(order.id);
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Confirm your order and proceed to payment.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Amount:</span>
          <span>
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalAmount)}
          </span>
        </div>
        <p className="text-sm text-gray-500">
          By clicking "Place Order", you agree to our terms and conditions.
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handlePlaceOrder}
          disabled={isPending}
          className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid="place-order-button"
        >
          {isPending ? 'Placing Order...' : 'Place Order'}
        </Button>
      </CardFooter>
    </Card>
  );
}