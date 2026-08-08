import type { JSX } from 'react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CreateReservationRequest } from '@/types/reservation';

interface ReservationFormProps {
  createReservation: (request: CreateReservationRequest) => void;
  isLoading: boolean;
}

export default function ReservationForm({ createReservation, isLoading }: ReservationFormProps): React.JSX.Element {
  const [customerName, setCustomerName] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [reservationDate, setReservationDate] = useState<Date | undefined>(undefined);
  const [reservationTime, setReservationTime] = useState<string>('');
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!reservationDate || !reservationTime) {
      alert('Please select both date and time for the reservation.');
      return;
    }

    const reservationDateTime = new Date(reservationDate);
    const [hours, minutes] = reservationTime.split(':').map(Number);
    reservationDateTime.setHours(hours, minutes);

    const request: CreateReservationRequest = {
      customerName,
      customerEmail,
      customerPhone,
      reservationTime: reservationDateTime.toISOString(),
      numberOfGuests,
      specialRequests,
    };

    createReservation(request);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="reservation-form">
      <div>
        <Label htmlFor="customerName">Name</Label>
        <Input
          id="customerName"
          type="text"
          value={customerName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerName(e.target.value)}
          required
          data-testid="reservation-customerName"
        />
      </div>
      <div>
        <Label htmlFor="customerEmail">Email</Label>
        <Input
          id="customerEmail"
          type="email"
          value={customerEmail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerEmail(e.target.value)}
          required
          data-testid="reservation-customerEmail"
        />
      </div>
      <div>
        <Label htmlFor="customerPhone">Phone</Label>
        <Input
          id="customerPhone"
          type="tel"
          value={customerPhone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomerPhone(e.target.value)}
          required
          data-testid="reservation-customerPhone"
        />
      </div>
      <div>
        <Label htmlFor="reservationDate">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !reservationDate && 'text-muted-foreground'
              )}
              data-testid="reservation-date-picker"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {reservationDate ? format(reservationDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={reservationDate}
              onSelect={setReservationDate}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="reservationTime">Time</Label>
        <Input
          id="reservationTime"
          type="time"
          value={reservationTime}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReservationTime(e.target.value)}
          required
          data-testid="reservation-reservationTime"
        />
      </div>
      <div>
        <Label htmlFor="numberOfGuests">Number of Guests</Label>
        <Input
          id="numberOfGuests"
          type="number"
          value={numberOfGuests}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumberOfGuests(Number(e.target.value))}
          min="1"
          required
          data-testid="reservation-numberOfGuests"
        />
      </div>
      <div>
        <Label htmlFor="specialRequests">Special Requests</Label>
        <Textarea
          id="specialRequests"
          value={specialRequests}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSpecialRequests(e.target.value)}
          rows={4}
          data-testid="reservation-specialRequests"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading} data-testid="reservation-submit">
        {isLoading ? 'Submitting...' : 'Make Reservation'}
      </Button>
    </form>
  );
}