import React from 'react';
import { Layout } from '@/components/Layout';
import { DeliveryAddressForm, DeliveryAddressFormData } from '@/components/checkout/DeliveryAddressForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentComponent from '@/components/checkout/PaymentComponent';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';

const CheckoutPage: React.FC = () => {
  const { cartItems, totals } = useCart();
  const { currentStep, deliveryDetails, setDeliveryDetails, nextStep, resetCheckout } = useCheckout();
  const navigate = useNavigate();

  const handleDeliverySubmit = (data: DeliveryAddressFormData) => {
    setDeliveryDetails(data);
    nextStep();
  };

  const handlePaymentSuccess = (orderId: string) => {
    resetCheckout();
    navigate(ROUTES.ORDER_HISTORY);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  if (cartItems.length === 0 && currentStep !== 3) { // Allow step 3 to show success message even with empty cart
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-[#36454F]">Your cart is empty.</h1>
            <p className="mt-4 text-lg text-gray-600">
              Please add items to your cart before proceeding to checkout.
            </p>
            <button
              onClick={() => navigate(ROUTES.MENU)}
              className="mt-6 bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              data-testid="back-to-menu-cta"
            >
              Browse Menu
            </button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-[#36454F] mb-12">Checkout</h1>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Step Indicator */}
            <div className="flex justify-between items-center mb-8">
              <div className={`flex-1 text-center ${currentStep === 1 ? 'font-bold text-[#D4AF37]' : 'text-gray-500'}`}>
                1. Delivery Details
              </div>
              <Separator orientation="horizontal" className="w-8 mx-2 bg-gray-300" />
              <div className={`flex-1 text-center ${currentStep === 2 ? 'font-bold text-[#D4AF37]' : 'text-gray-500'}`}>
                2. Order Summary
              </div>
              <Separator orientation="horizontal" className="w-8 mx-2 bg-gray-300" />
              <div className={`flex-1 text-center ${currentStep === 3 ? 'font-bold text-[#D4AF37]' : 'text-gray-500'}`}>
                3. Payment
              </div>
            </div>

            {currentStep === 1 && (
              <Card className="p-6 shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">Delivery Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <DeliveryAddressForm onSubmit={handleDeliverySubmit} initialData={deliveryDetails || undefined} />
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <OrderSummary cartItems={cartItems} totals={totals} />
                <Card className="p-6 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Delivery Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Name:</strong> {deliveryDetails?.customerName}</p>
                    <p><strong>Email:</strong> {deliveryDetails?.customerEmail}</p>
                    <p><strong>Phone:</strong> {deliveryDetails?.customerPhone}</p>
                    <p><strong>Address:</strong> {deliveryDetails?.deliveryAddress}</p>
                  </CardContent>
                </Card>
                <div className="flex justify-end">
                  <button
                    onClick={nextStep}
                    className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                    data-testid="proceed-to-payment-cta"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <PaymentComponent onPaymentSuccess={handlePaymentSuccess} />
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;