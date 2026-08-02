import AdminLayout from '@/components/AdminLayout';
import ReservationsTable from '@/components/admin/reservations/ReservationsTable';

export default function AdminReservationsPage() {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reservations Management</h2>
      </div>
      <div className="py-4">
        <ReservationsTable />
      </div>
    </AdminLayout>
  );
}