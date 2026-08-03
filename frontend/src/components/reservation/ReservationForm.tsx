'use client';

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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { useCreateReservation } from '@/hooks/useReservations';
import type { CreateReservationRequest } from '@/types/reservation';

const reservationFormSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerPhone: z
    .string()
    .regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number format. Please use a valid international format.'),
  customerEmail: z.string().email('Invalid email address'),
  partySize: z.coerce.number().min(1, 'Party size must be at least 1'),
  reservationDate: z.date().min(new Date(), 'Reservation date must be in the future'),
  reservationTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)')
    .refine(
      (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        const openingMinutes = 11 * 60; // 11:00 AM
        const closingMinutes = 23 * 60; // 11:00 PM
        return totalMinutes >= openingMinutes && totalMinutes <= closingMinutes;
      },
      'Reservation time must be between 11:00 AM and 11:00 PM'
    ),
  specialRequests: z.string().optional(),
});

export default function ReservationForm(): React.JSX.Element {
  const { mutate: createReservation, isPending } = useCreateReservation();

  const form = useForm<z.infer<typeof reservationFormSchema>>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      partySize: 1,
      reservationDate: undefined,
      reservationTime: '19:00', // Default to 7:00 PM
      specialRequests: '',
    },
  });

  const onSubmit = (values: z.infer<typeof reservationFormSchema>): void => {
    const reservationData: CreateReservationRequest = {
      customerName: values.customerName,
      customerPhone: values.customerPhone,
      customerEmail: values.customerEmail,
      partySize: values.partySize,
      reservationDate: format(values.reservationDate, 'yyyy-MM-dd'),
      reservationTime: values.reservationTime,
      specialRequests: values.specialRequests || '',
    };

    createReservation(reservationData, {
      onSuccess: () => {
        toast.success('Reservation successfully created!');
        form.reset();
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
                <Input placeholder="+91 9876543210" {...field} data-testid="reservation-customerPhone" />
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
                <Input type="email" placeholder="email@example.com" {...field} data-testid="reservation-customerEmail" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="partySize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Guests</FormLabel>
              <FormControl>
                <Input type="number" {...field} min={1} data-testid="reservation-partySize" />
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
        <Button
          type="submit"
          className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          disabled={isPending}
          data-testid="reservation-submit"
        >
          {isPending ? 'Submitting...' : 'Book Now'}
        </Button>
      </form>
    </Form>
  );
}