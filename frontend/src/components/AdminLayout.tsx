import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES, routeTable } from '@/routes';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LogOut, LayoutDashboard, Utensils, CalendarCheck, ScrollText, Image, MessageSquare, BookOpen, Users } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout } = useAuth();

  const adminNavRoutes = routeTable.filter(route => route.admin && route.nav);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#800020] text-white p-6 flex flex-col shadow-lg">
        <div className="text-2xl font-bold mb-8 text-[#D4AF37]">Farmaaish Admin</div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {adminNavRoutes.map((route) => (
              <li key={route.key}>
                <Link
                  to={route.path}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#a0002a] transition-colors duration-200"
                  data-testid={`nav-${route.key.toLowerCase().replace(/_/g, '-')}`}
                >
                  {route.key === 'ADMIN_DASHBOARD' && <LayoutDashboard className="h-5 w-5" />}
                  {route.key === 'ADMIN_MENU' && <Utensils className="h-5 w-5" />}
                  {route.key === 'ADMIN_RESERVATIONS' && <CalendarCheck className="h-5 w-5" />}
                  {route.key === 'ADMIN_ORDERS' && <ScrollText className="h-5 w-5" />}
                  {route.key === 'ADMIN_BLOG' && <BookOpen className="h-5 w-5" />}
                  {route.key === 'ADMIN_CATERING_INQUIRIES' && <MessageSquare className="h-5 w-5" />}
                  {route.key === 'ADMIN_TESTIMONIALS' && <Users className="h-5 w-5" />}
                  {route.key === 'ADMIN_GALLERY' && <Image className="h-5 w-5" />}
                  <span>{route.nav}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Separator className="my-6 bg-gray-700" />
        <div>
          <Button
            onClick={logout}
            className="w-full flex items-center gap-3 p-3 bg-transparent hover:bg-[#a0002a] text-white justify-start transition-colors duration-200"
            data-testid="admin-logout-button"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;