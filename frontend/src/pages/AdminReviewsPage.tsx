import type { JSX } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ReviewsTable from '@/components/admin/reviews/ReviewsTable';
import { SyncReviewsButton } from '@/components/admin/reviews/SyncReviewsButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AdminReviewsPage(): React.JSX.Element {
  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Reviews</h1>
        <SyncReviewsButton />
      </div>
      <Separator className="my-6" />
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewsTable />
        </CardContent>
      </Card>
    </AdminLayout>
  );
}