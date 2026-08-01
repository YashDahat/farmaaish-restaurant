import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

const deliveryAddressFormSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
});

export type DeliveryAddressFormData = z.infer<typeof deliveryAddressFormSchema>;

interface DeliveryAddressFormProps {
  onSubmit: (data: DeliveryAddressFormData) => void;
  initialData?: Partial<DeliveryAddressFormData>;
}

export function DeliveryAddressForm({
  onSubmit,
  initialData,
}: DeliveryAddressFormProps) {
  const form = useForm<DeliveryAddressFormData>({
    resolver: zodResolver(deliveryAddressFormSchema),
    defaultValues: {
      customerName: initialData?.customerName ?? '',
      customerEmail: initialData?.customerEmail ?? '',
      customerPhone: initialData?.customerPhone ?? '',
      deliveryAddress: initialData?.deliveryAddress ?? '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} data-testid="delivery-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your@example.com"
                  {...field}
                  data-testid="delivery-email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="123-456-7890"
                  {...field}
                  data-testid="delivery-phone"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deliveryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="123 Main St, Anytown"
                  {...field}
                  data-testid="delivery-address"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" data-testid="delivery-submit">
          Continue to Order Summary
        </Button>
      </form>
    </Form>
  );
}
