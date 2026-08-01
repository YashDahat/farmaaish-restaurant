import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/cart/CartContext';
import { useCreateOrder } from '@/hooks/useOrders';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';
import type { CreateOrderRequest, OrderItemRequest } from '@/types/order';
import { toast } from 'sonner';

interface PaymentSectionProps {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
}

export const PaymentSection = ({ customerName, customerPhone, deliveryAddress }: PaymentSectionProps) => {
  const { cartItems, totals, clearCart } = useCart();
  const createOrderMutation = useCreateOrder();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!cartItems || cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items before placing an order.');
      return;
    }

    const orderItems: OrderItemRequest[] = cartItems.map(item => ({
      menuItemId: item.id,
      quantity: item.quantity,
    }));

    const orderRequest: CreateOrderRequest = {
      orderItems,
      customerName,
      customerPhone,
      deliveryAddress,
    };

    try {
      const response = await createOrderMutation.mutateAsync(orderRequest);
      clearCart();
      navigate(`${ROUTES.ORDER_CONFIRMATION}?orderId=${response.id}`);
    } catch (error) {
      // Error handled by useCreateOrder hook's onError, just prevent further action
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Payment Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Order Total:</h3>
          <p className="text-3xl font-bold text-[#800020]">
            {totals.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Payment Method:</h3>
          <p className="text-gray-700">Cash on Delivery (COD)</p>
          <p className="text-sm text-gray-500">
            Payment will be collected at the time of delivery.
          </p>
        </div>

        <Button
          onClick={handlePlaceOrder}
          className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          disabled={createOrderMutation.isPending}
          data-testid="place-order-cta"
        >
          {createOrderMutation.isPending ? 'Placing Order...' : 'Place Order'}
        </Button>
      </CardContent>
    </Card>
  );
};