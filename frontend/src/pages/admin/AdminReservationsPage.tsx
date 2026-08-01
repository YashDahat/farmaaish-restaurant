import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useQuery } from '@tanstack/react-query';
import { getAllReservations } from '@/services/reservationService';
import ReservationsTable from '@/components/admin/reservations/ReservationsTable';
import ReservationDetailModal from '@/components/admin/reservations/ReservationDetailModal';
import { ReservationResponse } from '@/types/reservation';
import { Skeleton } from '@/components/ui/skeleton';

const AdminReservationsPage: React.FC = () => {
  const { data: reservations, isLoading, isError } = useQuery({
    queryKey: ['reservations'],
    queryFn: getAllReservations,
  });

  const [selectedReservation, setSelectedReservation] = useState<ReservationResponse | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewDetails = (reservation: ReservationResponse) => {
    setSelectedReservation(reservation);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedReservation(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#36454F] mb-6">Reservations Management</h1>
            <Skeleton className="h-[500px] w-full" />
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[#36454F] mb-6">Reservations Management</h1>
            <div className="text-red-500">Failed to load reservations.</div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#36454F] mb-6">Reservations Management</h1>

          {reservations && reservations.length > 0 ? (
            <ReservationsTable reservations={reservations} onViewDetails={handleViewDetails} />
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No reservations found.</p>
            </div>
          )}

          {isDetailModalOpen && selectedReservation && (
            <ReservationDetailModal
              reservation={selectedReservation}
              onClose={handleCloseDetailModal}
            />
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminReservationsPage;