import AdminLayout from '@/components/AdminLayout';
import MenuTable from '@/components/admin/menu/MenuTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminMenuPage() {
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Menu Management</CardTitle>
          </CardHeader>
          <CardContent>
            <MenuTable />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}