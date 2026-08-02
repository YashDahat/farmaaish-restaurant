'use client';

import ReservationForm from '@/components/reservation/ReservationForm';

export default function ReservationPage() {
  return (
    <section className="py-16 px-4 bg-[#F5F5DC]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#36454F] text-center mb-12">
          Make a Reservation
        </h1>
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <ReservationForm />
        </div>
      </div>
    </section>
  );
}