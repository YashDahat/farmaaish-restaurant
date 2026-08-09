import { OrderDto } from '@/types/order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface OrderConfirmationStepProps {
  order: OrderDto;
}

export default function OrderConfirmationStep({ order }: OrderConfirmationStepProps) {
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  return (
    <div className="space-y-6">
      <Card data-testid="order-confirmation-card">
        <CardHeader>
          <CardTitle className="text-center text-2xl md:text-3xl font-bold text-[#800020]">
            Order Confirmed!
          </CardTitle>
          <p className="text-center text-gray-700">Thank you for your order.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-semibold">Order ID: <span className="text-[#D4AF37]">{order.id}</span></p>
            <p className="text-lg font-semibold">Total Amount: <span className="text-[#D4AF37]">{formatCurrency(order.totalAmount)}</span></p>
          </div>

          <Separator />

          <h3 className="text-xl font-semibold text-[#800020]">Order Details</h3>
          <div className="space-y-2">
            {order.orderItems.map((item) => (
              <div key={item.menuItemId} className="flex justify-between items-center">
                <p className="text-gray-700">{item.menuItemName} x {item.quantity}</p>
                <p className="font-medium">{formatCurrency(item.subTotal)}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-center pt-4">
            <Link to={ROUTES.HOME}>
              <Button data-testid="back-to-home-cta" className="bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}