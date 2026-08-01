import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TestimonialDto } from '@/types/testimonial';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const testimonialFormSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  reviewText: z.string().min(1, 'Review text is required'),
  rating: z.coerce.number().min(1).max(5, 'Rating must be between 1 and 5'),
  displayOrder: z.coerce.number().min(0, 'Display order must be a positive number').optional(),
  isVisible: z.boolean().default(true),
});

interface TestimonialFormProps {
  initialData?: TestimonialDto;
  onSubmit: (data: TestimonialDto) => void;
}

export function TestimonialForm({ initialData, onSubmit }: TestimonialFormProps) {
  const form = useForm<z.infer<typeof testimonialFormSchema>>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      customerName: initialData?.customerName ?? '',
      reviewText: initialData?.reviewText ?? '',
      rating: initialData?.rating ?? 1,
      displayOrder: initialData?.displayOrder ?? 0,
      isVisible: initialData?.isVisible ?? true,
    },
  });

  function handleSubmit(values: z.infer<typeof testimonialFormSchema>) {
    onSubmit({
      ...initialData,
      customerName: values.customerName,
      reviewText: values.reviewText,
      rating: values.rating,
      displayOrder: values.displayOrder,
      isVisible: values.isVisible,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Name</FormLabel>
              <FormControl>
                <Input placeholder="Customer Name" {...field} data-testid="testimonial-customerName" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reviewText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Text</FormLabel>
              <FormControl>
                <Textarea placeholder="Review Text" {...field} data-testid="testimonial-reviewText" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating (1-5)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Rating" {...field} data-testid="testimonial-rating" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Display Order" {...field} data-testid="testimonial-displayOrder" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isVisible"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Visible</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-testid="testimonial-isVisible"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200" data-testid="testimonial-submit">
          {initialData ? 'Update Testimonial' : 'Create Testimonial'}
        </Button>
      </form>
    </Form>
  );
}