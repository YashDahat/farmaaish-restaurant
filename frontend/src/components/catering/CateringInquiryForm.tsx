import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

import { useSubmitInquiry } from '@/hooks/useInquiries';
import type { CateringInquiryDto } from '@/types/inquiry';
import { InquirySuccessMessage } from './InquirySuccessMessage';

const formSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
  customerPhone: z.string().regex(/^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 'Invalid phone number format (e.g., +91 9876543210)').min(1, 'Phone number is required'),
  eventType: z.string().min(1, 'Event type is required'),
  eventDate: z.date().min(new Date(), 'Event date must be in the future'),
  numberOfGuests: z.coerce.number().min(10, 'Minimum 10 guests required'),
  budget: z.coerce.number().optional(),
  message: z.string().optional(),
});

export const CateringInquiryForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { mutateAsync, isPending } = useSubmitInquiry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      eventType: '',
      numberOfGuests: 10,
      budget: undefined,
      message: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const inquiryData: CateringInquiryDto = {
        id: null,
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        customerPhone: values.customerPhone,
        eventType: values.eventType,
        eventDate: format(values.eventDate, 'yyyy-MM-dd'),
        numberOfGuests: values.numberOfGuests,
        budget: values.budget,
        message: values.message,
        inquiryStatus: 'NEW',
        createdAt: null,
        updatedAt: null,
      };
      await mutateAsync(inquiryData);
      setIsSubmitted(true);
      form.reset();
      toast.success('Inquiry submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
      console.error('Catering inquiry submission error:', error);
    }
  };

  if (isSubmitted) {
    return <InquirySuccessMessage />;
  }

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
                <Input placeholder="John Doe" {...field} data-testid="catering-customerName" />
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
                <Input type="email" placeholder="john.doe@example.com" {...field} data-testid="catering-customerEmail" />
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
                <Input placeholder="+91 9876543210" {...field} data-testid="catering-customerPhone" />
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
                <Input placeholder="Wedding, Corporate Event, Birthday Party, etc." {...field} data-testid="catering-eventType" />
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
                        !field.value && 'text-muted-foreground'
                      )}
                      data-testid="catering-eventDate-trigger"
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
                <Input type="number" placeholder="e.g., 50" {...field} data-testid="catering-numberOfGuests" />
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
              <FormLabel>Budget (INR, optional)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 50000" {...field} data-testid="catering-budget" />
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
              <FormLabel>Additional Message (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us more about your event..." {...field} data-testid="catering-message" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-[#D4AF37] hover:bg-[#b8952b] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          disabled={isPending}
          data-testid="catering-submit-cta"
        >
          {isPending ? 'Submitting...' : 'Submit Inquiry'}
        </Button>
      </form>
    </Form>
  );
};