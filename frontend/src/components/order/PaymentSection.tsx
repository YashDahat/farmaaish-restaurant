import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/cart/CartContext';
import { useCreateOrder } from '@/hooks/useOrders';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';
import type { CreateOrderRequest, OrderItemRequest } from '@/types/order';
import { toast } from 'sonner';

interface DeliveryDetails {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
}

interface PaymentSectionProps {
  deliveryDetails: DeliveryDetails;
}

export default function PaymentSection({ deliveryDetails }: PaymentSectionProps): JSX.Element {
  const { cartItems, totals, clearCart } = useCart();
  const { mutate: createOrder, isPending, isError, error, data: orderResponse } = useCreateOrder();
  const navigate = useNavigate();

  const handlePlaceOrder = (): void => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items before placing an order.');
      return;
    }

    const orderItems: OrderItemRequest[] = cartItems.map((item) => ({
      menuItemId: Number(item.id),
      quantity: item.quantity,
    }));

    const orderRequest: CreateOrderRequest = {
      customerId: 1, // Placeholder customer ID, replace with actual customer ID from auth context if available
      customerName: deliveryDetails.customerName,
      customerPhone: deliveryDetails.customerPhone,
      deliveryAddress: deliveryDetails.deliveryAddress,
      notes: '', // Optional notes
      orderItems: orderItems,
    };

    createOrder(orderRequest);
  };

  if (orderResponse) {
    clearCart();
    navigate(`${ROUTES.ORDER_CONFIRMATION}?orderId=${orderResponse.id}`);
  }

  if (isError) {
    toast.error(`Order placement failed: ${error?.message || 'Unknown error'}`);
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>Review your order and place your order.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>
              {totals.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </span>
          </div>
          <Button
            onClick={handlePlaceOrder}
            className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            disabled={isPending}
            data-testid="place-order-cta"
          >
            {isPending ? 'Placing Order...' : 'Place Order'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}