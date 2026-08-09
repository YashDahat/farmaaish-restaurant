import AdminLayout from '@/components/AdminLayout';
import ReservationsTable from '@/components/admin/reservations/ReservationsTable';

export default function AdminReservationsPage(): React.JSX.Element {
  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Reservations</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ReservationsTable />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}