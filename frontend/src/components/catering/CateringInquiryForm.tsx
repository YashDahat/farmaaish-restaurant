import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInquiries } from '@/hooks/useInquiries';
import { InquiryDto } from '@/types/inquiry';
import { toast } from 'sonner';

const formSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  eventType: z.string().min(1, 'Event type is required'),
  eventDate: z.string().min(1, 'Event date is required'),
  numberOfGuests: z.coerce.number().min(1, 'Number of guests must be at least 1'),
  message: z.string().optional(),
});

export default function CateringInquiryForm() {
  const { createInquiry, isCreatingInquiry } = useInquiries();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      eventType: '',
      eventDate: '',
      numberOfGuests: 1,
      message: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const inquiryData: InquiryDto = {
      ...values,
      id: null,
      inquiryDate: new Date().toISOString(),
      status: 'NEW',
    };
    createInquiry(inquiryData, {
      onSuccess: () => {
        toast.success('Catering inquiry submitted successfully!');
        form.reset();
      },
      onError: (error) => {
        toast.error('Failed to submit inquiry.', {
          description: error.message,
        });
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-[#36454F]">Catering Inquiry</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} data-testid="inquiry-customerName" />
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
                  <Input type="email" placeholder="john.doe@example.com" {...field} data-testid="inquiry-customerEmail" />
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
                  <Input type="tel" placeholder="9876543210" {...field} data-testid="inquiry-customerPhone" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type of Event</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="inquiry-eventType">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="birthday">Birthday Party</SelectItem>
                    <SelectItem value="social">Social Gathering</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} data-testid="inquiry-eventDate" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfGuests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Guests</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} data-testid="inquiry-numberOfGuests" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Message / Special Requests</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us more about your event..." {...field} data-testid="inquiry-message" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-[#D4AF37] hover:bg-[#b8942e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            disabled={isCreatingInquiry}
            data-testid="inquiry-submit"
          >
            {isCreatingInquiry ? 'Submitting...' : 'Submit Inquiry'}
          </Button>
        </form>
      </Form>
    </div>
  );
}