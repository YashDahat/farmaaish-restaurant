import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useCreateInquiry } from '@/hooks/useInquiries';
import type { CreateInquiryRequest } from '@/types/inquiry';

const formSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
  customerPhone: z
    .string()
    .regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number format (e.g., +919876543210)')
    .min(1, 'Phone number is required'),
  eventType: z.string().min(1, 'Event type is required'),
  eventDate: z.date({ required_error: 'Event date is required' }),
  numberOfGuests: z.coerce.number().min(1, 'Number of guests must be at least 1'),
  budget: z.coerce.number().optional().nullable(),
  specialRequests: z.string().optional(),
});

type CateringInquiryFormValues = z.infer<typeof formSchema>;

const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Private Gathering',
  'Other',
];

export default function CateringInquiryForm(): React.JSX.Element {
  const { mutate, isPending } = useCreateInquiry();

  const form = useForm<CateringInquiryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      eventType: '',
      numberOfGuests: 1,
      budget: undefined,
      specialRequests: '',
    },
  });

  const onSubmit = (values: CateringInquiryFormValues): void => {
    const inquiryRequest: CreateInquiryRequest = {
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerPhone: values.customerPhone,
      eventType: values.eventType,
      eventDate: format(values.eventDate, 'yyyy-MM-dd'),
      numberOfGuests: values.numberOfGuests,
      budget: values.budget ?? 0,
      specialRequests: values.specialRequests ?? '',
    };

    mutate(inquiryRequest, {
      onSuccess: () => {
        toast.success('Your catering inquiry has been submitted successfully! We will contact you shortly.');
        form.reset();
      },
      onError: () => {
        toast.error('Failed to submit inquiry. Please try again.');
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="catering-inquiry-form">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} data-testid="catering-name-input" />
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
                <Input type="email" placeholder="john.doe@example.com" {...field} data-testid="catering-email-input" />
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
                <Input placeholder="+919876543210" {...field} data-testid="catering-phone-input" />
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
                  <SelectTrigger data-testid="catering-event-type-select">
                    <SelectValue placeholder="Select an event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
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
            <FormItem className="flex flex-col">
              <FormLabel>Event Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                      data-testid="catering-event-date-picker"
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
                <Input type="number" placeholder="50" {...field} data-testid="catering-guests-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget (INR)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="50000" {...field} data-testid="catering-budget-input" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialRequests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Requests</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any dietary restrictions, specific cuisine preferences, etc."
                  rows={5}
                  {...field}
                  data-testid="catering-requests-textarea"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending} data-testid="catering-submit-button">
          {isPending ? 'Submitting...' : 'Submit Inquiry'}
        </Button>
      </form>
    </Form>
  );
}