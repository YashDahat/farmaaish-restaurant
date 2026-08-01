import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

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
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useCreateReservation } from '@/hooks/useReservations';
import { CreateReservationRequest, ReservationResponse } from '@/types/reservation';

const formSchema = z.object({
  customerName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  customerEmail: z.string().email({ message: 'Invalid email address.' }),
  customerPhone: z.string().regex(/^\+?[1-9]\d{9,14}$/, { message: 'Invalid phone number format.' }),
  reservationDate: z.date({ required_error: 'A reservation date is required.' }),
  reservationTime: z.string().min(1, { message: 'A reservation time is required.' }),
  partySize: z.coerce.number().min(1, { message: 'Party size must be at least 1.' }),
  specialRequests: z.string().optional(),
});

interface ReservationFormProps {
  onReservationSuccess: (reservation: ReservationResponse) => void;
}

const ReservationForm = ({ onReservationSuccess }: ReservationFormProps) => {
  const { mutate: createReservation, isPending } = useCreateReservation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      reservationTime: '',
      partySize: 1,
      specialRequests: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const request: CreateReservationRequest = {
      customerName: values.customerName,
      customerEmail: values.customerEmail,
      customerPhone: values.customerPhone,
      reservationDate: format(values.reservationDate, 'yyyy-MM-dd'),
      reservationTime: values.reservationTime,
      partySize: values.partySize,
      specialRequests: values.specialRequests ?? null,
    };

    createReservation(request, {
      onSuccess: (data) => {
        toast.success('Reservation confirmed!');
        onReservationSuccess(data);
        form.reset();
      },
      onError: (error) => {
        toast.error('Failed to make reservation.', {
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
                <Input placeholder="e.g., +919876543210" {...field} data-testid="reservation-customerPhone" />
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
                    disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
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
          className="w-full bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          disabled={isPending}
          data-testid="reservation-submit"
        >
          {isPending ? 'Confirming...' : 'Confirm Reservation'}
        </Button>
      </form>
    </Form>
  );
};

export default ReservationForm;