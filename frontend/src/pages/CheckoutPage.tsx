"use client";

import { useState } from "react";
import { useCart } from "@/cart/CartContext";
import DeliveryDetailsForm, { DeliveryDetails } from "@/components/order/DeliveryDetailsForm";
import OrderSummary from "@/components/order/OrderSummary";
import PaymentSection from "@/components/order/PaymentSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CheckoutPage(): JSX.Element {
  const { cartItems, totals } = useCart();
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails | null>(null);

  const handleDeliveryDetailsSubmit = (data: DeliveryDetails): void => {
    setDeliveryDetails(data);
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary Section */}
          <div className="space-y-8">
            <OrderSummary cartItems={cartItems} totals={totals} />
          </div>

          {/* Delivery Details / Payment Section */}
          <div className="space-y-8">
            <Card className="w-full" data-testid="delivery-details-card">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent>
                <DeliveryDetailsForm onSubmit={handleDeliveryDetailsSubmit} initialData={deliveryDetails || undefined} />
              </CardContent>
            </Card>

            {deliveryDetails && (
              <>
                <Separator className="my-8" />
                <PaymentSection deliveryDetails={deliveryDetails} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}