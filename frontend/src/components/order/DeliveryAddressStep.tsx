import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface DeliveryAddressStepProps {
  onNext: (data: DeliveryAddressFormData) => void;
  initialData?: DeliveryAddressFormData;
}

export interface DeliveryAddressFormData {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  specialInstructions: string;
}

export default function DeliveryAddressStep({ onNext, initialData }: DeliveryAddressStepProps) {
  const [formData, setFormData] = useState<DeliveryAddressFormData>(
    initialData || {
      customerName: '',
      customerPhone: '',
      deliveryAddress: '',
      specialInstructions: '',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="space-y-6 p-6 border rounded-lg shadow-sm bg-white">
      <h2 className="text-2xl font-semibold text-gray-800">Delivery Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="customerName" className="text-gray-700">
            Full Name
          </Label>
          <Input
            id="customerName"
            type="text"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
            data-testid="delivery-name"
          />
        </div>
        <div>
          <Label htmlFor="customerPhone" className="text-gray-700">
            Phone Number
          </Label>
          <Input
            id="customerPhone"
            type="tel"
            value={formData.customerPhone}
            onChange={handleChange}
            required
            className="mt-1 block w-full"
            data-testid="delivery-phone"
          />
        </div>
        <div>
          <Label htmlFor="deliveryAddress" className="text-gray-700">
            Delivery Address
          </Label>
          <Textarea
            id="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full"
            data-testid="delivery-address"
          />
        </div>
        <div>
          <Label htmlFor="specialInstructions" className="text-gray-700">
            Special Instructions (e.g., "Leave at door", "Ring bell twice")
          </Label>
          <Textarea
            id="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full"
            data-testid="delivery-instructions"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid="delivery-next-button"
        >
          Continue to Payment
        </Button>
      </form>
    </div>
  );
}