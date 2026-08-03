import AdminLayout from '@/components/AdminLayout';
import ReservationsTable from '@/components/reservation/ReservationsTable';
import { useAllReservations } from '@/hooks/useReservations';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminReservationsPage(): JSX.Element {
  const { data: reservations, isLoading, isError, error } = useAllReservations();

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Reservations</h1>
            <p className="text-gray-600 mb-8">View and manage all customer reservations.</p>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Reservations</h1>
            <p className="text-gray-600 mb-8">View and manage all customer reservations.</p>
            <div className="text-red-500">Error loading reservations: {error?.message}</div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6" data-testid="admin-reservations-title">Manage Reservations</h1>
          <p className="text-gray-600 mb-8">View and manage all customer reservations.</p>
          {reservations && reservations.length > 0 ? (
            <ReservationsTable reservations={reservations} />
          ) : (
            <div className="text-center py-10 text-gray-500">No reservations found.</div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
}