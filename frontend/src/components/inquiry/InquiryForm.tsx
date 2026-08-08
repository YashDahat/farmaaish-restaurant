import type { JSX } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useSubmitInquiry } from '@/hooks/useInquiries';
import type { CreateEventInquiryRequest } from '@/types/inquiry';

const inquiryFormSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number (10 digits starting with 6-9)'),
  eventType: z.string().min(1, 'Event type is required'),
  eventDate: z.date({
    required_error: 'Event date is required',
  }),
  numberOfGuests: z.coerce.number().min(1, 'Number of guests must be at least 1'),
  specialRequests: z.string().optional(),
});

export default function InquiryForm(): JSX.Element {
  const { mutate: submitInquiry, isPending, error } = useSubmitInquiry();

  const form = useForm<z.infer<typeof inquiryFormSchema>>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      eventType: '',
      numberOfGuests: 1,
      specialRequests: '',
    },
  });

  const onSubmit = (values: z.infer<typeof inquiryFormSchema>): void => {
    const request: CreateEventInquiryRequest = {
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerPhone: values.customerPhone,
      eventType: values.eventType,
      eventDate: values.eventDate.toISOString(),
      numberOfGuests: values.numberOfGuests,
      specialRequests: values.specialRequests ?? '',
    };
    submitInquiry(request);
  };

  return (
    <section className="py-16 px-4 bg-gray-50" data-testid="inquiry-form-section">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          Inquire About Your Event
        </h2>
        <p className="text-center text-gray-700 mb-10">
          Tell us about your event, and our team will get back to you shortly to discuss how
          Farmaaish can make it unforgettable.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 inquiry-form">
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
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                      data-testid="inquiry-customerEmail"
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
                      placeholder="9876543210"
                      {...field}
                      data-testid="inquiry-customerPhone"
                    />
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
                  <FormControl>
                    <Input
                      placeholder="Wedding, Corporate Event, Birthday, etc."
                      {...field}
                      data-testid="inquiry-eventType"
                    />
                  </FormControl>
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
                            !field.value && 'text-muted-foreground',
                          )}
                          data-testid="inquiry-eventDate-trigger"
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
                    <Input
                      type="number"
                      placeholder="e.g., 100"
                      {...field}
                      data-testid="inquiry-numberOfGuests"
                    />
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
                  <FormLabel>Special Requests (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any specific dietary needs, themes, or other requests?"
                      rows={5}
                      {...field}
                      data-testid="inquiry-specialRequests"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-red-500 text-sm" data-testid="inquiry-error-message">
                {error.message}
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              disabled={isPending}
              data-testid="inquiry-submit"
            >
              {isPending ? 'Submitting...' : 'Submit Inquiry'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}