'use client';

import ReservationForm from '@/components/reservation/ReservationForm';

export default function ReservationPage(): React.JSX.Element {
  return (
    <>
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/restaurant-table-setting-at-night-g_k3_t-t808')" }}
        data-testid="reservation-hero-section"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="reservation-hero-title">
            Farmaaish Restaurant
          </h1>
          <p className="text-xl md:text-2xl" data-testid="reservation-hero-subtitle">
            Experience the Grandeur of Mughlai Cuisine. Book Your Table Today.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white" data-testid="reservation-form-section">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
            Reserve Your Table
          </h2>
          <p className="text-gray-700 leading-relaxed text-center mb-8">
            Planning a special occasion or just a delightful meal? Book your table with us and let us create an unforgettable dining experience for you.
          </p>
          <ReservationForm />
        </div>
      </section>
    </>
  );
}