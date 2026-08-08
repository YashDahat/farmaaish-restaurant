'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  deliveryAddress: z.string().min(10, 'Address must be at least 10 characters.'),
  contactPhone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format.'),
});

export type DeliveryAddressFormValues = z.infer<typeof formSchema>;

interface DeliveryAddressFormProps {
  onSubmit: (values: DeliveryAddressFormValues) => void;
  initialValues?: DeliveryAddressFormValues;
}

export default function DeliveryAddressForm({
  onSubmit,
  initialValues,
}: DeliveryAddressFormProps): React.JSX.Element {
  const form = useForm<DeliveryAddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      deliveryAddress: '',
      contactPhone: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="delivery-address-form">
        <FormField
          control={form.control}
          name="deliveryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your full delivery address"
                  {...field}
                  data-testid="delivery-address-address"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., +919876543210"
                  {...field}
                  data-testid="delivery-address-phone"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid="delivery-address-submit"
        >
          Continue to Payment
        </Button>
      </form>
    </Form>
  );
}