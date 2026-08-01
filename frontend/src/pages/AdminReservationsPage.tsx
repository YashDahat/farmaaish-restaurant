import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useQuery } from '@tanstack/react-query';
import { getAllReservations } from '@/services/reservationService';
import { ReservationResponse } from '@/types/reservation';
import { ReservationsTable } from '@/components/reservation/ReservationsTable';
import ReservationDetailView from '@/components/reservation/ReservationDetailView';
import { Skeleton } from '@/components/ui/skeleton';

const AdminReservationsPage = () => {
  const { data: reservations, isLoading, isError } = useQuery<ReservationResponse[], Error>({
    queryKey: ['reservations'],
    queryFn: getAllReservations,
  });

  const [selectedReservation, setSelectedReservation] = useState<ReservationResponse | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  const handleViewDetails = (reservation: ReservationResponse) => {
    setSelectedReservation(reservation);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setSelectedReservation(null);
  };

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6" data-testid="admin-reservations-title">
            Manage Reservations
          </h1>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : isError ? (
            <div className="text-red-500 text-center">Failed to load reservations.</div>
          ) : (
            <ReservationsTable reservations={reservations ?? []} onViewDetails={handleViewDetails} />
          )}

          <ReservationDetailView
            reservation={selectedReservation}
            isOpen={isDetailViewOpen}
            onClose={handleCloseDetailView}
          />
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminReservationsPage;