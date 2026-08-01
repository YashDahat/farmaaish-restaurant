import { useState } from 'react';
import Layout from '@/components/Layout';
import ReservationForm from '@/components/reservation/ReservationForm';
import { ReservationSuccessDialog } from '@/components/reservation/ReservationSuccessDialog';
import { ReservationResponse } from '@/types/reservation';

const ReservationsPage = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<ReservationResponse | null>(null);

  const handleReservationSuccess = (reservation: ReservationResponse) => {
    setReservationDetails(reservation);
    setShowSuccessDialog(true);
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    setReservationDetails(null);
  };

  return (
    <Layout>
      <section className="relative h-[400px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/reservation-hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Book Your Table</h1>
          <p className="text-xl text-white">Experience the finest dining at Farmaaish Restaurant</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#800020] mb-8">Make a Reservation</h2>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <ReservationForm onReservationSuccess={handleReservationSuccess} />
          </div>
        </div>
      </section>

      <ReservationSuccessDialog
        isOpen={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        reservationDetails={reservationDetails}
      />
    </Layout>
  );
};

export default ReservationsPage;