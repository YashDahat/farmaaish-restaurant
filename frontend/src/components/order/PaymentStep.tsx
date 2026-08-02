"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/cart/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useOrders } from '@/hooks/useOrders';
import { CreateOrderRequest } from '@/types/order';
import { toast } from 'sonner';
import { CheckoutStep } from '@/cart/types';

interface PaymentStepProps {
  onNext: (step: CheckoutStep) => void;
  deliveryAddress: string;
  contactPhone: string;
}

export default function PaymentStep({ onNext, deliveryAddress, contactPhone }: PaymentStepProps) {
  const { totals, cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder, isCreatingOrder, createOrderError, createdOrder } = useOrders();

  const handlePlaceOrder = () => {
    if (!user?.id) {
      toast.error("User not authenticated. Please log in.");
      return;
    }

    if (!deliveryAddress || !contactPhone) {
      toast.error("Delivery address and contact phone are required.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items before placing an order.");
      return;
    }

    const orderItems = cartItems.map(item => ({
      menuItemId: item.id as string,
      quantity: item.quantity,
    }));

    const orderRequest: CreateOrderRequest = {
      customerId: user.id,
      deliveryAddress,
      contactPhone,
      orderItems,
    };

    createOrder(orderRequest);
  };

  useEffect(() => {
    if (createdOrder) {
      if (createdOrder.paymentLink) {
        toast.success("Order placed successfully! Redirecting to payment gateway...");
        clearCart();
        window.location.href = createdOrder.paymentLink;
      } else {
        toast.success("Order placed successfully, awaiting payment confirmation.");
        clearCart();
        onNext(CheckoutStep.ORDER_CONFIRMATION); // Assuming there's a confirmation step
      }
    }
  }, [createdOrder, clearCart, onNext]);

  useEffect(() => {
    if (createOrderError) {
      toast.error(`Failed to place order: ${createOrderError.message}`);
    }
  }, [createOrderError]);

  const formattedTotal = totals.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="payment-step-card">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-semibold">Confirm Order & Pay</CardTitle>
        <CardDescription className="text-gray-700 leading-relaxed">
          Review your order and proceed to payment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-lg font-medium">
          <span>Total Amount:</span>
          <span className="text-[#D4AF37]">{formattedTotal}</span>
        </div>
        <div className="text-sm text-gray-600">
          Please click "Place Order & Pay" to finalize your order and be redirected to our secure payment gateway.
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handlePlaceOrder}
          disabled={isCreatingOrder}
          className="bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 w-full"
          data-testid="place-order-pay-cta"
        >
          {isCreatingOrder ? 'Processing...' : 'Place Order & Pay'}
        </Button>
      </CardFooter>
    </Card>
  );
}