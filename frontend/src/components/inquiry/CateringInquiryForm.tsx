import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';

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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { useInquiry } from '@/hooks/useInquiry';
import type { CreateInquiryRequest } from '@/types/inquiry';

const inquiryFormSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number cannot exceed 15 digits'),
  eventType: z.string().min(1, 'Event type is required'),
  eventDate: z.date({
    required_error: 'Event date is required',
  }),
  numberOfGuests: z.coerce.number().min(1, 'Number of guests must be at least 1'),
  budget: z.coerce.number().min(0, 'Budget cannot be negative'),
  specialRequests: z.string().optional(),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

export const CateringInquiryForm = () => {
  const { mutate: submitInquiry, isPending } = useInquiry();

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      eventType: '',
      eventDate: undefined,
      numberOfGuests: 1,
      budget: 0,
      specialRequests: '',
    },
  });

  const onSubmit = (values: InquiryFormValues) => {
    const inquiryRequest: CreateInquiryRequest = {
      ...values,
      eventDate: format(values.eventDate, 'yyyy-MM-dd'),
    };
    submitInquiry(inquiryRequest, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Catering Inquiry</CardTitle>
        <CardDescription className="text-gray-600">
          Please fill out the form below to inquire about our catering services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormLabel>Your Email</FormLabel>
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
                  <FormLabel>Your Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+91 9876543210" {...field} data-testid="inquiry-customerPhone" />
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
                  <FormLabel>Event Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} data-testid="inquiry-eventType">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate Event</SelectItem>
                      <SelectItem value="birthday">Birthday Party</SelectItem>
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
                        disabled={(date) => date < new Date('1900-01-01')}
                        initialFocus
                        data-testid="inquiry-eventDate-calendar"
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
                    <Input type="number" placeholder="50" {...field} data-testid="inquiry-numberOfGuests" />
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
                  <FormLabel>Budget (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50000" {...field} data-testid="inquiry-budget" />
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
                      placeholder="Any specific dietary needs, themes, or other requests?"
                      className="resize-y"
                      {...field}
                      data-testid="inquiry-specialRequests"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              disabled={isPending}
              data-testid="inquiry-submit-cta"
            >
              {isPending ? 'Submitting...' : 'Submit Inquiry'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};