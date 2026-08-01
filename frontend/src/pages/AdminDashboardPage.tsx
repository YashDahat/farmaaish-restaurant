import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboardPage = () => {
  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#36454F] mb-8">Admin Dashboard</h1>
          <Card data-testid="admin-dashboard-card">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Welcome, Admin!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#36454F] leading-relaxed">
                Use the navigation sidebar to manage menu items, reservations, orders, gallery, inquiries, and blog posts.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminDashboardPage;