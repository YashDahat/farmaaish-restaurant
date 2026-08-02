import AdminLayout from '@/components/AdminLayout';
import InquiriesTable from '@/components/admin/inquiries/InquiriesTable';

export default function AdminInquiriesPage() {
  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8" data-testid="admin-inquiries-title">
            Manage Inquiries
          </h1>
          <InquiriesTable />
        </div>
      </section>
    </AdminLayout>
  );
}