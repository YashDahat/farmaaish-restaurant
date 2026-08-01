import Layout from '@/components/Layout';
import { ReservationForm } from '@/components/reservations/ReservationForm';

const ReservationPage = () => {
  return (
    <Layout>
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/reservation-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="reservation-page-title">
            Book Your Table at Farmaaish
          </h1>
          <p className="text-lg md:text-xl">Experience the finest dining with us.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#36454F]">
            Make a Reservation
          </h2>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <ReservationForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReservationPage;