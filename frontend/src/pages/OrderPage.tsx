"use client";

import { useState } from "react";
import { useCheckout } from "@/cart/useCheckout";
import CartSummary from "@/components/order/CartSummary";
import DeliveryAddressForm from "@/components/order/DeliveryAddressForm";
import PaymentStep from "@/components/order/PaymentStep";
import { CheckoutStep } from "@/cart/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function OrderPage() {
  const { currentStep, goToNextStep, goToPreviousStep } = useCheckout();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const handleDeliverySubmit = (values: {
    deliveryAddress: string;
    contactPhone: string;
  }) => {
    setDeliveryAddress(values.deliveryAddress);
    setContactPhone(values.contactPhone);
    goToNextStep();
  };

  return (
    <section className="py-16 px-4 bg-gray-50" data-testid="order-page">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Complete Your Order
        </h1>

        <div className="space-y-8">
          {currentStep === CheckoutStep.CART_REVIEW && (
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-semibold">
                  1. Review Your Cart
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CartSummary />
                <Separator className="my-6" />
                <div className="flex justify-end">
                  <Button
                    onClick={goToNextStep}
                    className="bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                    data-testid="proceed-to-delivery-cta"
                  >
                    Proceed to Delivery
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === CheckoutStep.DELIVERY_DETAILS && (
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-semibold">
                  2. Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DeliveryAddressForm
                  initialData={{ deliveryAddress, contactPhone }}
                  onSubmit={handleDeliverySubmit}
                />
                <Separator className="my-6" />
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="mt-4 w-full md:w-auto"
                  data-testid="back-to-cart-cta"
                >
                  Back to Cart
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === CheckoutStep.PAYMENT && (
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-semibold">
                  3. Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentStep
                  onNext={goToNextStep}
                  deliveryAddress={deliveryAddress}
                  contactPhone={contactPhone}
                />
                <Separator className="my-6" />
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="mt-4 w-full md:w-auto"
                  data-testid="back-to-delivery-cta"
                >
                  Back to Delivery
                </Button>
              </CardContent>
            </Card>
          )}

          {currentStep === CheckoutStep.ORDER_CONFIRMATION && (
            <Card className="w-full max-w-2xl mx-auto text-center py-12">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-[#D4AF37]">
                  Order Placed Successfully!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg text-gray-700">
                  Thank you for your order. We have received your request and
                  are processing it.
                </p>
                <p className="text-md text-gray-600">
                  You will receive an email confirmation shortly.
                </p>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 mt-6"
                  data-testid="back-to-home-cta"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}