import AdminLayout from '@/components/AdminLayout';
import OrdersTable from '@/components/admin/orders/OrdersTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Manage Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersTable />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}