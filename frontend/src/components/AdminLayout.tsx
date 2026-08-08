import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PanelLeft, Home, Utensils, BookText, ScrollText, MessageSquare, Image, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/routes';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps): React.ReactElement {
  const location = useLocation();
  const { logout } = useAuth();

  const adminNavLinks = [
    {
      label: 'Dashboard',
      href: ROUTES.ADMIN_DASHBOARD,
      icon: Home,
      dataTestId: 'nav-admin-dashboard',
    },
    {
      label: 'Menu',
      href: ROUTES.ADMIN_MENU,
      icon: Utensils,
      dataTestId: 'nav-admin-menu',
    },
    {
      label: 'Reservations',
      href: ROUTES.ADMIN_RESERVATIONS,
      icon: BookText,
      dataTestId: 'nav-admin-reservations',
    },
    {
      label: 'Orders',
      href: ROUTES.ADMIN_ORDERS,
      icon: ScrollText,
      dataTestId: 'nav-admin-orders',
    },
    {
      label: 'Inquiries',
      href: ROUTES.ADMIN_INQUIRIES,
      icon: MessageSquare,
      dataTestId: 'nav-admin-inquiries',
    },
    {
      label: 'Gallery',
      href: ROUTES.ADMIN_GALLERY,
      icon: Image,
      dataTestId: 'nav-admin-gallery',
    },
  ];

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-[#36454F] md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to={ROUTES.ADMIN_DASHBOARD} className="flex items-center gap-2 font-semibold text-[#D4AF37]">
              <span>Farmaaish Admin</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {adminNavLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-[#D4AF37] ${
                    location.pathname === link.href ? 'bg-[#D4AF37] text-[#36454F] hover:text-[#36454F]' : ''
                  }`}
                  data-testid={link.dataTestId}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
              <Separator className="my-4 bg-gray-600" />
              <Button
                onClick={() => logout()}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-[#D4AF37] bg-transparent hover:bg-transparent justify-start"
                data-testid="admin-logout-button"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 shadow-sm lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-[#36454F] text-white">
              <nav className="grid gap-2 text-lg font-medium">
                <Link to={ROUTES.ADMIN_DASHBOARD} className="flex items-center gap-2 text-[#D4AF37] text-xl font-semibold mb-4">
                  <span>Farmaaish Admin</span>
                </Link>
                {adminNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-white hover:text-[#D4AF37] ${
                      location.pathname === link.href ? 'bg-[#D4AF37] text-[#36454F] hover:text-[#36454F]' : ''
                    }`}
                    data-testid={link.dataTestId}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
                <Separator className="my-4 bg-gray-600" />
                <Button
                  onClick={() => logout()}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-white hover:text-[#D4AF37] bg-transparent hover:bg-transparent justify-start"
                  data-testid="admin-logout-button-mobile"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Admin Header Content (e.g., search bar, user menu) */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}