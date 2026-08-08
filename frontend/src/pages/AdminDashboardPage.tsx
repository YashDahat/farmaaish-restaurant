import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/routes';
import { Button } from '@/components/ui/button';

const AdminDashboardPage: React.FC = () => {
  const adminNavCards = [
    {
      title: 'Manage Menu',
      description: 'Add, edit, or remove menu items and categories.',
      link: ROUTES.ADMIN_MENU,
      dataTestId: 'admin-menu-card',
    },
    {
      title: 'Manage Reservations',
      description: 'View and update customer reservations.',
      link: ROUTES.ADMIN_RESERVATIONS,
      dataTestId: 'admin-reservations-card',
    },
    {
      title: 'Manage Orders',
      description: 'Track and update customer food orders.',
      link: ROUTES.ADMIN_ORDERS,
      dataTestId: 'admin-orders-card',
    },
    {
      title: 'Manage Inquiries',
      description: 'Handle event and catering inquiries.',
      link: ROUTES.ADMIN_INQUIRIES,
      dataTestId: 'admin-inquiries-card',
    },
    {
      title: 'Manage Gallery',
      description: 'Upload and organize restaurant photos.',
      link: ROUTES.ADMIN_GALLERY,
      dataTestId: 'admin-gallery-card',
    },
  ];

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-[#36454F]">Welcome to Farmaaish Admin Portal</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#36454F]">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#36454F]">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-[#D4AF37]">120</p>
                <p className="text-gray-600">Last 30 days</p>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#36454F]">New Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-[#D4AF37]">15</p>
                <p className="text-gray-600">This week</p>
              </CardContent>
            </Card>
            <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#36454F]">Pending Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-[#D4AF37]">5</p>
                <p className="text-gray-600">Unresolved</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#36454F]">Management Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminNavCards.map((card) => (
              <Card key={card.link} className="bg-white rounded-xl shadow-md border border-gray-100 p-6" data-testid={card.dataTestId}>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#36454F]">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{card.description}</p>
                  <Link to={card.link}>
                    <Button className="bg-[#D4AF37] hover:bg-[#C2A032] text-[#36454F] font-medium rounded-md px-4 py-2 transition-all duration-200">
                      Go to {card.title.replace('Manage ', '')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;