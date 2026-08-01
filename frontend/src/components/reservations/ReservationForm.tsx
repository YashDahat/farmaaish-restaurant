import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useCreateReservation } from '@/hooks/useReservations';
import type { CreateReservationRequest } from '@/types/reservation';
import { ReservationSuccessDialog } from './ReservationSuccessDialog';

const reservationFormSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  customerEmail: z.string().email('Invalid email address').min(1, 'Email is required'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number cannot exceed 15 digits'),
  reservationDate: z.date({
    required_error: 'A reservation date is required.',
  }),
  reservationTime: z.string().min(1, 'Time is required'),
  partySize: z.coerce.number().min(1, 'Party size must be at least 1').max(20, 'Party size cannot exceed 20'),
});

export const ReservationForm = () => {
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const { mutate: createReservation, isPending } = useCreateReservation({
    onSuccess: () => {
      setIsSuccessDialogOpen(true);
      form.reset();
    },
    onError: (error) => {
      console.error('Reservation failed:', error);
      // Optionally show an error toast
    },
  });

  const form = useForm<z.infer<typeof reservationFormSchema>>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      reservationTime: '',
      partySize: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof reservationFormSchema>) => {
    const reservationRequest: CreateReservationRequest = {
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerPhone: values.customerPhone,
      reservationDate: format(values.reservationDate, 'yyyy-MM-dd'),
      reservationTime: values.reservationTime,
      partySize: values.partySize,
    };
    createReservation(reservationRequest);
  };

  return (
    <>
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
            name="customerEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your Email" {...field} data-testid="reservation-customerEmail" />
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
                  <Input type="tel" placeholder="Your Phone Number" {...field} data-testid="reservation-customerPhone" />
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
            name="partySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Party Size</FormLabel>
                <FormControl>
                  <Input type="number" {...field} data-testid="reservation-partySize" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            disabled={isPending}
            data-testid="reservation-submit"
          >
            {isPending ? 'Booking...' : 'Book Now'}
          </Button>
        </form>
      </Form>
      <ReservationSuccessDialog
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
      />
    </>
  );
};