import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES, routeTable } from '@/routes';
import { LogOut, Menu as MenuIcon, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const adminNavRoutes = routeTable.filter(route => route.admin && route.nav);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#800020] text-white p-4 shadow-lg">
        <div className="text-2xl font-bold mb-6 text-[#D4AF37]">Farmaaish Admin</div>
        <nav className="flex-1">
          {adminNavRoutes.map(route => (
            <Link
              key={route.key}
              to={route.path}
              className="flex items-center p-3 rounded-md text-white hover:bg-[#a02c4c] transition-colors duration-200 mb-2"
              data-testid={`nav-${route.key.toLowerCase().replace(/_/g, '-')}`}
            >
              {route.nav}
            </Link>
          ))}
        </nav>
        <Separator className="bg-gray-700 my-4" />
        <Button
          onClick={handleLogout}
          className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full py-3 transition-all duration-200"
          data-testid="admin-logout-button"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar for mobile and desktop */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between md:justify-end">
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-[#800020] text-white p-4">
                <div className="text-2xl font-bold mb-6 text-[#D4AF37]">Farmaaish Admin</div>
                <nav className="flex flex-col gap-2">
                  {adminNavRoutes.map(route => (
                    <Link
                      key={route.key}
                      to={route.path}
                      className="flex items-center p-3 rounded-md text-white hover:bg-[#a02c4c] transition-colors duration-200"
                      data-testid={`nav-${route.key.toLowerCase().replace(/_/g, '-')}-mobile`}
                    >
                      {route.nav}
                    </Link>
                  ))}
                </nav>
                <Separator className="bg-gray-700 my-4" />
                <Button
                  onClick={handleLogout}
                  className="w-full bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full py-3 transition-all duration-200"
                  data-testid="admin-logout-button-mobile"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </SheetContent>
            </Sheet>
            <span className="text-xl font-bold text-[#800020]">Admin Panel</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem onClick={handleLogout} data-testid="admin-dropdown-logout">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;