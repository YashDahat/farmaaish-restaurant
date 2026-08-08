import type { JSX } from 'react';
import AdminLayout from '@/components/AdminLayout';
import InquiriesTable from '@/components/admin/inquiries/InquiriesTable';
import { useAllInquiries } from '@/hooks/useInquiries';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminInquiriesPage(): JSX.Element {
  const { data: inquiries, isLoading, isError, error } = useAllInquiries();

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Event Inquiries</h1>
      </div>

      <section className="py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : isError ? (
            <div className="text-red-500">Error loading inquiries: {error?.message}</div>
          ) : inquiries && inquiries.length > 0 ? (
            <InquiriesTable inquiries={inquiries} />
          ) : (
            <div className="text-center text-gray-500 py-8">No inquiries found.</div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
}