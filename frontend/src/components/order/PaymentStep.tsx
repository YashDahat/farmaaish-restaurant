import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

interface PaymentStepProps {
  totalAmount: number;
  onPaymentSuccess: (gatewayOrderId: string) => void;
  onPaymentError: (error: string) => void;
}

export default function PaymentStep({ totalAmount, onPaymentSuccess, onPaymentError }: PaymentStepProps) {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardName, setCardName] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  const handlePayment = async (): Promise<void> => {
    setIsProcessing(true);
    // Simulate payment gateway processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error('Please fill in all payment details.');
      onPaymentError('Missing payment details');
      setIsProcessing(false);
      return;
    }

    // Basic validation (can be expanded)
    if (cardNumber.length < 16 || isNaN(Number(cardNumber))) {
      toast.error('Invalid card number.');
      onPaymentError('Invalid card number');
      setIsProcessing(false);
      return;
    }
    if (cvv.length < 3 || isNaN(Number(cvv))) {
      toast.error('Invalid CVV.');
      onPaymentError('Invalid CVV');
      setIsProcessing(false);
      return;
    }

    const paymentSuccessful = Math.random() > 0.1; // 90% success rate for simulation

    if (paymentSuccessful) {
      const gatewayOrderId = `PAY-${Date.now()}`;
      toast.success('Payment successful!');
      onPaymentSuccess(gatewayOrderId);
    } else {
      toast.error('Payment failed. Please try again.');
      onPaymentError('Payment failed');
    }
    setIsProcessing(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto" data-testid="payment-step">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-semibold">Payment Details</CardTitle>
        <CardDescription>Total amount: <span className="font-bold text-[#D4AF37]">{formatCurrency(totalAmount)}</span></CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="XXXX XXXX XXXX XXXX"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').slice(0, 16))}
            data-testid="payment-card-number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cardName">Name on Card</Label>
          <Input
            id="cardName"
            type="text"
            placeholder="John Doe"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            data-testid="payment-card-name"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value.replace(/[^0-9]/g, '').slice(0, 4).replace(/(\d{2})(\d{0,2})/, '$1/$2'))}
              data-testid="payment-expiry-date"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              type="password"
              placeholder="***"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
              data-testid="payment-cvv"
            />
          </div>
        </div>
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid="payment-submit"
        >
          {isProcessing ? 'Processing...' : `Pay ${formatCurrency(totalAmount)}`}
        </Button>
      </CardContent>
    </Card>
  );
}