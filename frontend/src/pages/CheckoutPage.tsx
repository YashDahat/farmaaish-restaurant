import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useCart } from '@/cart/CartContext';
import { useCheckout } from '@/cart/useCheckout';
import { CheckoutStep } from '@/cart/types';
import { createOrder } from '@/services/orderService';
import { CreateOrderRequest, OrderDto } from '@/types/order';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/routes';

import DeliveryAddressStep, { DeliveryAddressFormData } from '@/components/order/DeliveryAddressStep';
import PaymentStep from '@/components/order/PaymentStep';
import OrderConfirmationStep from '@/components/order/OrderConfirmationStep';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function CheckoutPage() {
  const { cartItems, totals, clearCart, cartCount } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [deliveryData, setDeliveryData] = useState<DeliveryAddressFormData | null>(null);
  const [order, setOrder] = useState<OrderDto | null>(null);

  const checkoutSteps: CheckoutStep[] = [
    { id: 'delivery', label: 'Delivery Address', validate: () => !!deliveryData },
    { id: 'payment', label: 'Payment', validate: () => totals.total > 0 },
    { id: 'confirmation', label: 'Order Confirmation', validate: () => !!order },
  ];

  const { current, progress, next, goTo, error: checkoutError } = useCheckout(checkoutSteps);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to proceed with checkout.');
      navigate(ROUTES.LOGIN);
    } else if (cartCount === 0) {
      toast.error('Your cart is empty. Please add items before checking out.');
      navigate(ROUTES.MENU);
    }
  }, [isAuthenticated, cartCount, navigate]);

  useEffect(() => {
    if (checkoutError) {
      toast.error(checkoutError);
    }
  }, [checkoutError]);

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data: OrderDto) => {
      setOrder(data);
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['orders', user?.username] });
      next(); // Move to confirmation step
    },
    onError: (error: Error) => {
      toast.error(`Order creation failed: ${error.message}`);
    },
  });

  const handleDeliverySubmit = (data: DeliveryAddressFormData): void => {
    setDeliveryData(data);
    next();
  };

  const handlePaymentSuccess = async (gatewayOrderId: string): Promise<void> => {
    if (!user?.username) {
      toast.error('User not authenticated for order creation.');
      return;
    }

    if (!deliveryData) {
      toast.error('Delivery address is missing.');
      goTo('delivery');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Cart is empty. Cannot create order.');
      navigate(ROUTES.MENU);
      return;
    }

    const orderRequest: CreateOrderRequest = {
      userId: parseInt(user.username), // Assuming username is the user ID
      items: cartItems.map((item) => ({
        menuItemId: item.id.toString(),
        quantity: item.quantity,
      })),
    };

    createOrderMutation.mutate(orderRequest);
  };

  const handlePaymentError = (error: string): void => {
    toast.error(`Payment failed: ${error}`);
  };

  if (!isAuthenticated || cartCount === 0) {
    return null; // Redirect handled by useEffect
  }

  return (
    <section className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold text-[#800020]">Checkout</CardTitle>
            <p className="text-gray-600 mt-2">Complete your order in a few simple steps.</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="w-full">
              <Progress value={progress} className="h-2 bg-gray-200" data-testid="checkout-progress" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                {checkoutSteps.map((step, index) => (
                  <span
                    key={step.id}
                    className={`cursor-pointer ${current?.id === step.id ? 'font-semibold text-[#D4AF37]' : ''}`}
                    onClick={() => goTo(step.id)}
                    data-testid={`checkout-step-${step.id}`}
                  >
                    {index + 1}. {step.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              {current?.id === 'delivery' && (
                <DeliveryAddressStep onNext={handleDeliverySubmit} initialData={deliveryData || undefined} />
              )}
              {current?.id === 'payment' && (
                <PaymentStep
                  totalAmount={totals.total}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />
              )}
              {current?.id === 'confirmation' && order && (
                <OrderConfirmationStep order={order} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}