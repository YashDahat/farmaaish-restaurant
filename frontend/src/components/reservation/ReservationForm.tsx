'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useReservations } from '@/hooks/useReservations';
import type { ReservationRequest } from '@/types/reservation';

const reservationFormSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  customerPhone: z.string().min(1, 'Phone number is required'),
  customerEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
  reservationDate: z.date({
    required_error: 'A reservation date is required.',
  }),
  reservationTime: z.string().min(1, 'Time is required'),
  numberOfGuests: z.coerce.number().min(1, 'At least 1 guest is required'),
  specialRequests: z.string().optional(),
});

type ReservationFormValues = z.infer<typeof reservationFormSchema>;

export default function ReservationForm() {
  const { createReservation, isPending } = useReservations();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      reservationTime: '',
      numberOfGuests: 1,
      specialRequests: '',
    },
  });

  const onSubmit = (values: ReservationFormValues) => {
    const request: ReservationRequest = {
      customerName: values.customerName,
      customerPhone: values.customerPhone,
      customerEmail: values.customerEmail,
      reservationDate: format(values.reservationDate, 'yyyy-MM-dd'),
      reservationTime: values.reservationTime,
      numberOfGuests: values.numberOfGuests,
      specialRequests: values.specialRequests,
    };

    createReservation(request, {
      onSuccess: () => {
        toast.success('Reservation created successfully!');
        form.reset();
        setSelectedDate(undefined);
      },
      onError: (error) => {
        toast.error('Failed to create reservation.', {
          description: error.message || 'Please try again.',
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="reservation-form">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} data-testid="reservation-customerName" />
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
                <Input placeholder="Your Phone Number" {...field} data-testid="reservation-customerPhone" />
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
                <Input placeholder="Your Email" {...field} data-testid="reservation-customerEmail" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reservationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Reservation Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                      data-testid="reservation-reservationDate-trigger"
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
                    onSelect={(date) => {
                      field.onChange(date);
                      setSelectedDate(date);
                    }}
                    disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
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
          name="reservationTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reservation Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} data-testid="reservation-reservationTime" />
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
                <Input type="number" {...field} data-testid="reservation-numberOfGuests" />
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
                <Textarea placeholder="Any special requests?" {...field} data-testid="reservation-specialRequests" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" disabled={isPending} data-testid="reservation-submit-cta">
          {isPending ? 'Submitting...' : 'Make Reservation'}
        </Button>
      </form>
    </Form>
  );
}