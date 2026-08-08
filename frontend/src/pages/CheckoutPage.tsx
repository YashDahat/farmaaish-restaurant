'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/cart/CartContext';
import { useCheckout } from '@/cart/useCheckout';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import DeliveryAddressForm, { DeliveryAddressFormValues } from '@/components/checkout/DeliveryAddressForm';
import PaymentComponent from '@/components/checkout/PaymentComponent';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ROUTES } from '@/routes';
import { toast } from 'sonner';

export default function CheckoutPage(): React.JSX.Element {
  const { cartItems, totals, clearCart, cartCount } = useCart();
  const { steps, current, index, isFirst, isLast, progress, next, back } = useCheckout();
  const navigate = useNavigate();

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryAddressFormValues | null>(null);

  const handleDeliverySubmit = (values: DeliveryAddressFormValues): void => {
    setDeliveryDetails(values);
    next();
  };

  const handleOrderSuccess = (orderId: string): void => {
    clearCart();
    toast.success(`Order ${orderId} placed successfully!`);
    navigate(ROUTES.PROFILE); // Redirect to profile or order confirmation page
  };

  if (cartCount === 0 && current?.id !== 'payment') {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty!</h1>
          <p className="text-gray-700 mb-8">Please add some items to your cart before checking out.</p>
          <Button
            onClick={() => navigate(ROUTES.MENU)}
            className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          >
            Go to Menu
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>

        <div className="mb-8">
          <Progress value={progress} className="w-full" />
          <p className="text-center text-sm text-gray-600 mt-2">
            Step {index + 1} of {steps.length}: {current?.label}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-8">
          {current?.id === 'cart-review' && (
            <div data-testid="checkout-step-cart-review">
              <OrderSummary cartItems={cartItems} totals={totals} />
              <div className="flex justify-end mt-6">
                <Button
                  onClick={next}
                  disabled={cartCount === 0}
                  className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                  data-testid="continue-to-delivery-button"
                >
                  Continue to Delivery
                </Button>
              </div>
            </div>
          )}

          {current?.id === 'delivery-details' && (
            <div data-testid="checkout-step-delivery-details">
              <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
              <DeliveryAddressForm onSubmit={handleDeliverySubmit} initialValues={deliveryDetails || undefined} />
              <div className="flex justify-start mt-6">
                <Button
                  variant="outline"
                  onClick={back}
                  className="text-gray-700 border-gray-300 hover:bg-gray-100 rounded-full px-8 py-3 transition-all duration-200"
                  data-testid="back-to-cart-button"
                >
                  Back to Cart
                </Button>
              </div>
            </div>
          )}

          {current?.id === 'payment' && deliveryDetails && (
            <div data-testid="checkout-step-payment">
              <h2 className="text-2xl font-semibold mb-4">Payment</h2>
              <PaymentComponent
                totalAmount={totals.total}
                orderItems={cartItems}
                deliveryAddress={deliveryDetails.deliveryAddress}
                contactPhone={deliveryDetails.contactPhone}
                onOrderSuccess={handleOrderSuccess}
              />
              <div className="flex justify-start mt-6">
                <Button
                  variant="outline"
                  onClick={back}
                  className="text-gray-700 border-gray-300 hover:bg-gray-100 rounded-full px-8 py-3 transition-all duration-200"
                  data-testid="back-to-delivery-button"
                >
                  Back to Delivery
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}