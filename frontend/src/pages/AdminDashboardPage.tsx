import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';
import { Utensils, CalendarDays, ScrollText, Mail } from 'lucide-react';

export default function AdminDashboardPage(): JSX.Element {
  const adminFeatures = [
    {
      title: 'Menu Management',
      description: 'Manage menu items and categories.',
      icon: Utensils,
      link: ROUTES.ADMIN_MENU,
      dataTestId: 'admin-menu-card',
    },
    {
      title: 'Reservations',
      description: 'View and manage table reservations.',
      icon: CalendarDays,
      link: ROUTES.ADMIN_RESERVATIONS,
      dataTestId: 'admin-reservations-card',
    },
    {
      title: 'Orders',
      description: 'Process and track customer orders.',
      icon: ScrollText,
      link: ROUTES.ADMIN_ORDERS,
      dataTestId: 'admin-orders-card',
    },
    {
      title: 'Catering Inquiries',
      description: 'Handle catering requests and inquiries.',
      icon: Mail,
      link: ROUTES.ADMIN_CATERING_INQUIRIES,
      dataTestId: 'admin-catering-inquiries-card',
    },
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#36454F] mb-8">
          Welcome to Farmaaish Admin Portal
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature) => (
            <Link to={feature.link} key={feature.title} data-testid={feature.dataTestId}>
              <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-semibold text-[#800020]">
                    {feature.title}
                  </CardTitle>
                  <feature.icon className="h-8 w-8 text-[#D4AF37]" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}