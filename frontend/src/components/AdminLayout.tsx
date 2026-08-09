import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES, routeTable } from '@/routes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const adminNavLinks = routeTable.filter(route => route.nav && route.admin);

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    navigate(ROUTES.LOGIN);
    return null;
  }

  const handleLogout = (): void => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const Sidebar = (): React.JSX.Element => (
    <nav className="flex flex-col space-y-2 p-4">
      {adminNavLinks.map((route) => (
        <Link
          key={route.key}
          to={route.path}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"
          data-testid={`nav-${route.key.toLowerCase().replace(/_/g, '-')}`}
          onClick={() => setIsSheetOpen(false)}
        >
          {route.label}
        </Link>
      ))}
      <Separator className="my-2" />
      <Button
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"
        variant="ghost"
        data-testid="admin-logout-button"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to={ROUTES.ADMIN_DASHBOARD} className="flex items-center gap-2 font-semibold">
              <span className="text-lg">Farmaaish Admin</span>
            </Link>
          </div>
          <div className="flex-1">
            <Sidebar />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
                data-testid="mobile-menu-button"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <Link to={ROUTES.ADMIN_DASHBOARD} className="flex items-center gap-2 text-lg font-semibold">
                <span>Farmaaish Admin</span>
              </Link>
              <Sidebar />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Welcome, {user?.username}</span>
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              data-testid="desktop-logout-button"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}