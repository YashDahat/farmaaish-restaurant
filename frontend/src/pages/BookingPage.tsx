import React from 'react';
import ReservationForm from '@/components/reservation/ReservationForm';
import { useCreateReservation } from '@/hooks/useReservations';
import type { CreateReservationRequest } from '@/types/reservation';

export default function BookingPage(): React.JSX.Element {
  const { mutate: createReservation, isPending: isLoading } = useCreateReservation();

  const handleCreateReservation = (request: CreateReservationRequest): void => {
    createReservation(request);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/hero-booking.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="booking-hero-headline">
            Experience the Grandeur of Farmaaish
          </h1>
          <p className="text-lg md:text-xl" data-testid="booking-hero-subheadline">
            Reserve Your Table for an Unforgettable Mughlai Feast.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8" data-testid="booking-form-title">
            Make a Reservation
          </h2>
          <ReservationForm createReservation={handleCreateReservation} isLoading={isLoading} />
        </div>
      </section>
    </div>
  );
}