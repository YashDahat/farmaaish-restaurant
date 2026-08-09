import ReservationForm from '@/components/reservation/ReservationForm';

export default function BookingPage() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#36454F] mb-6 text-center">
            Book Your Table at Farmaaish Restaurant
          </h1>
          <p className="text-lg text-gray-600 mb-10 text-center">
            Experience the regal flavors of Mughlai cuisine. Reserve your table for an unforgettable dining experience.
          </p>
          <ReservationForm />
        </div>
      </div>
    </section>
  );
}