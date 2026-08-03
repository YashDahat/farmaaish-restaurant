import AdminLayout from '@/components/AdminLayout';
import InquiriesTable from '@/components/inquiry/InquiriesTable';
import { useAllCateringInquiries } from '@/hooks/useInquiries';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminCateringInquiriesPage(): JSX.Element {
  const { data: inquiries, isLoading, isError, error } = useAllCateringInquiries();

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8" data-testid="admin-inquiries-heading">
            Catering Inquiries
          </h1>

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : isError ? (
            <div className="text-red-500">Error: {error?.message}</div>
          ) : inquiries && inquiries.length > 0 ? (
            <InquiriesTable inquiries={inquiries} />
          ) : (
            <div className="text-gray-600">No catering inquiries found.</div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
}