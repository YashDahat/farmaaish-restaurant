import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { ReservationsTable } from '@/components/admin/reservations/ReservationsTable';
import UpdateReservationDialog from '@/components/admin/reservations/UpdateReservationDialog';
import { useGetAllReservations, useUpdateReservationStatus } from '@/hooks/useReservations';
import type { ReservationResponse, ReservationStatus, UpdateReservationStatusRequest } from '@/types/reservation';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminReservationsPage(): JSX.Element {
  const { data: reservations, isLoading, isError, error } = useGetAllReservations();
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateReservationStatus();

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false);
  const [reservationToUpdate, setReservationToUpdate] = useState<ReservationResponse | null>(null);

  const handleUpdateStatusClick = (id: string, currentStatus: ReservationStatus): void => {
    const reservation = reservations?.find((r) => r.id === id);
    if (reservation) {
      setReservationToUpdate(reservation);
      setIsUpdateDialogOpen(true);
    }
  };

  const handleUpdateStatusConfirm = (id: string, newStatus: ReservationStatus): void => {
    const request: UpdateReservationStatusRequest = { status: newStatus };
    updateStatus({ id, request });
    setIsUpdateDialogOpen(false);
    setReservationToUpdate(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex flex-col space-y-4 p-4">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="p-4 text-red-500">Error loading reservations: {error?.message}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Reservations</h1>
        {reservations && reservations.length > 0 ? (
          <ReservationsTable reservations={reservations} onUpdateStatus={handleUpdateStatusClick} />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No reservations found.</p>
          </div>
        )}

        <UpdateReservationDialog
          isOpen={isUpdateDialogOpen}
          onClose={() => setIsUpdateDialogOpen(false)}
          onConfirm={handleUpdateStatusConfirm}
          reservationToUpdate={reservationToUpdate}
          isLoading={isUpdating}
        />
      </div>
    </AdminLayout>
  );
}