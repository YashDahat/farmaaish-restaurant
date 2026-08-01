import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { DeliveryAddressForm } from '@/components/checkout/DeliveryAddressForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { PaymentSection } from '@/components/checkout/PaymentSection';
import { useCart } from '@/cart/CartContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { toast } from 'sonner';

type DeliveryFormData = {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
};

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [deliveryData, setDeliveryData] = useState<DeliveryFormData | null>(null);

  const handleDeliverySubmit = (data: DeliveryFormData) => {
    setDeliveryData(data);
    setStep(2);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  if (cartItems.length === 0) {
    toast.info('Your cart is empty. Please add items to proceed to checkout.');
    navigate(ROUTES.MENU);
    return null;
  }

  return (
    <Layout>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#800020]">Checkout</h1>

          <div className="flex justify-center items-center mb-8">
            <div className={`flex items-center ${step >= 1 ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-[#D4AF37] bg-[#D4AF37] text-white' : 'border-gray-400 bg-white text-gray-700'} font-semibold`}>
                1
              </div>
              <span className="ml-2 font-medium">Delivery Address</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-[#D4AF37]' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-[#D4AF37] bg-[#D4AF37] text-white' : 'border-gray-400 bg-white text-gray-700'} font-semibold`}>
                2
              </div>
              <span className="ml-2 font-medium">Order Summary</span>
            </div>
            <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-[#D4AF37]' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-[#D4AF37] bg-[#D4AF37] text-white' : 'border-gray-400 bg-white text-gray-700'} font-semibold`}>
                3
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>

          {step > 1 && (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-6 text-gray-700 hover:text-[#800020] transition-all duration-200"
              data-testid="back-button"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          )}

          {step === 1 && (
            <DeliveryAddressForm onSubmit={handleDeliverySubmit} initialData={deliveryData ?? undefined} />
          )}

          {step === 2 && deliveryData && (
            <>
              <OrderSummary {...deliveryData} />
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setStep(3)}
                  className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                  data-testid="proceed-to-payment-cta"
                >
                  Proceed to Payment
                </Button>
              </div>
            </>
          )}

          {step === 3 && deliveryData && (
            <PaymentSection {...deliveryData} />
          )}
        </div>
      </section>
    </Layout>
  );
}