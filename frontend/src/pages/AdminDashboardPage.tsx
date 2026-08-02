import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage() {
  // Placeholder values for summary statistics
  const summaryStats = {
    totalReservations: 120,
    pendingOrders: 15,
    newInquiries: 8,
    activeEvents: 3,
    menuItems: 45,
  };

  const adminLinks = [
    { name: 'Manage Menu', route: ROUTES.ADMIN_MENU, dataTestId: 'admin-menu-link' },
    { name: 'Manage Reservations', route: ROUTES.ADMIN_RESERVATIONS, dataTestId: 'admin-reservations-link' },
    { name: 'Manage Orders', route: ROUTES.ADMIN_ORDERS, dataTestId: 'admin-orders-link' },
    { name: 'Manage Events', route: ROUTES.ADMIN_EVENTS, dataTestId: 'admin-events-link' },
    { name: 'Manage Inquiries', route: ROUTES.ADMIN_INQUIRIES, dataTestId: 'admin-inquiries-link' },
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
        <p className="text-lg text-gray-600 mb-8">Welcome to the Farmaaish Restaurant Admin Panel. Here you can manage all aspects of your restaurant operations.</p>

        <Separator className="my-8" />

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Summary Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card data-testid="stat-card-reservations">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summaryStats.totalReservations}</div>
              </CardContent>
            </Card>
            <Card data-testid="stat-card-orders">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summaryStats.pendingOrders}</div>
              </CardContent>
            </Card>
            <Card data-testid="stat-card-inquiries">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summaryStats.newInquiries}</div>
              </CardContent>
            </Card>
            <Card data-testid="stat-card-events">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summaryStats.activeEvents}</div>
              </CardContent>
            </Card>
            <Card data-testid="stat-card-menu-items">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Menu Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summaryStats.menuItems}</div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Quick Navigation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminLinks.map((link) => (
              <Link
                key={link.route}
                to={link.route}
                className="block p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-center text-lg font-medium text-[#800020] hover:text-[#D4AF37]"
                data-testid={link.dataTestId}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}