import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateOrder } from '@/hooks/useOrders';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';
import { CreateOrderRequest, OrderItemRequest } from '@/types/order';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface PaymentComponentProps {
  onPaymentSuccess: (orderId: string) => void;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ onPaymentSuccess }) => {
  const { cartItems, clearCart } = useCart();
  const { deliveryDetails } = useCheckout();
  const createOrderMutation = useCreateOrder();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!deliveryDetails || cartItems.length === 0) {
      toast.error('Missing delivery details or empty cart.');
      return;
    }

    const orderItems: OrderItemRequest[] = cartItems.map(item => ({
      menuItemId: String(item.id),
      quantity: item.quantity,
    }));

    const orderRequest: CreateOrderRequest = {
      customerName: deliveryDetails.customerName,
      customerEmail: deliveryDetails.customerEmail,
      customerPhone: deliveryDetails.customerPhone,
      deliveryAddress: deliveryDetails.deliveryAddress,
      orderItems: orderItems,
    };

    try {
      const response = await createOrderMutation.mutateAsync(orderRequest);
      if (response.id) {
        clearCart();
        toast.success('Order placed successfully!');
        onPaymentSuccess(response.id);
        navigate(ROUTES.ORDER_HISTORY); // Redirect to order history or confirmation
      } else {
        toast.error('Failed to get order ID after creation.');
      }
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('Order creation error:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Confirm Payment</CardTitle>
        <CardDescription>Review your order and proceed to payment.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            By clicking "Pay Now", you confirm your order and agree to our terms and conditions.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handlePayment}
          disabled={createOrderMutation.isPending}
          className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid="pay-now-button"
        >
          {createOrderMutation.isPending ? 'Processing...' : 'Pay Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentComponent;