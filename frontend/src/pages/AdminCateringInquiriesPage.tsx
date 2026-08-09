import AdminLayout from '@/components/AdminLayout';
import InquiriesTable from '@/components/admin/inquiries/InquiriesTable';

export default function AdminCateringInquiriesPage() {
  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Catering Inquiries</h1>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <InquiriesTable />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}