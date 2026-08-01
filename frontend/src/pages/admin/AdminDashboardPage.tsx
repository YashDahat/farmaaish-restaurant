import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  const adminNavLinks = [
    { name: 'Blog Posts', route: ROUTES.ADMIN_BLOG, description: 'Manage blog posts' },
    { name: 'Catering Inquiries', route: ROUTES.ADMIN_CATERING_INQUIRIES, description: 'Review catering inquiries' },
    { name: 'Gallery Images', route: ROUTES.ADMIN_GALLERY, description: 'Manage restaurant gallery' },
    { name: 'Menu Items', route: ROUTES.ADMIN_MENU, description: 'Manage food and beverage menu' },
    { name: 'Orders', route: ROUTES.ADMIN_ORDERS, description: 'Process customer orders' },
    { name: 'Reservations', route: ROUTES.ADMIN_RESERVATIONS, description: 'Manage table reservations' },
    { name: 'Testimonials', route: ROUTES.ADMIN_TESTIMONIALS, description: 'Curate customer testimonials' },
  ];

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#36454F] mb-6">Admin Dashboard</h1>
          <p className="text-lg text-gray-700 mb-8">
            Welcome to the Farmaaish Restaurant Admin Panel. Use the navigation below to manage various aspects of the restaurant's operations.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-semibold text-[#36454F] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminNavLinks.map((link) => (
              <Link to={link.route} key={link.route} data-testid={`nav-${link.route.split('/')[2]}`}>
                <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="text-[#800020]">{link.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{link.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminDashboardPage;