import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/routes';
import { useAuth } from '@/hooks/useAuth';
import CartDrawer from './cart/CartDrawer';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const navLinks = [
    { name: 'Home', path: ROUTES.HOME, dataTestId: 'nav-home' },
    { name: 'Menu', path: ROUTES.MENU, dataTestId: 'nav-menu' },
    { name: 'Reservations', path: ROUTES.RESERVATIONS, dataTestId: 'nav-reservations' },
    { name: 'Gallery', path: ROUTES.GALLERY, dataTestId: 'nav-gallery' },
    { name: 'Catering', path: ROUTES.CATERING, dataTestId: 'nav-catering' },
    { name: 'Blog', path: ROUTES.BLOG, dataTestId: 'nav-blog' },
    { name: 'About', path: ROUTES.ABOUT, dataTestId: 'nav-about' },
    { name: 'Contact', path: ROUTES.CONTACT, dataTestId: 'nav-contact' },
  ];

  const adminNavLinks = [
    { name: 'Dashboard', path: ROUTES.ADMIN_DASHBOARD, dataTestId: 'nav-admin-dashboard' },
    { name: 'Menu', path: ROUTES.ADMIN_MENU, dataTestId: 'nav-admin-menu' },
    { name: 'Reservations', path: ROUTES.ADMIN_RESERVATIONS, dataTestId: 'nav-admin-reservations' },
    { name: 'Orders', path: ROUTES.ADMIN_ORDERS, dataTestId: 'nav-admin-orders' },
    { name: 'Gallery', path: ROUTES.ADMIN_GALLERY, dataTestId: 'nav-admin-gallery' },
    { name: 'Inquiries', path: ROUTES.ADMIN_INQUIRIES, dataTestId: 'nav-admin-inquiries' },
    { name: 'Blog', path: ROUTES.ADMIN_BLOG, dataTestId: 'nav-admin-blog' },
  ];

  return (
    <header className="bg-[#800020] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={ROUTES.HOME} className="text-2xl font-bold text-[#D4AF37]" data-testid="logo-link">
          Farmaaish Restaurant
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-[#D4AF37] transition-all duration-200" data-testid={link.dataTestId}>
              {link.name}
            </Link>
          ))}
          {isAuthenticated && user?.role === 'ADMIN' && (
            <Link to={ROUTES.ADMIN_DASHBOARD} className="hover:text-[#D4AF37] transition-all duration-200" data-testid="nav-admin-dashboard-link">
              Admin
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.ORDER_HISTORY} className="hover:text-[#D4AF37] transition-all duration-200" data-testid="nav-order-history">
                Order History
              </Link>
              <Button onClick={logout} variant="ghost" className="text-white hover:text-[#D4AF37]" data-testid="logout-button">
                Logout
              </Button>
            </>
          ) : (
            <Link to={ROUTES.LOGIN} className="hover:text-[#D4AF37] transition-all duration-200" data-testid="nav-login">
              Login
            </Link>
          )}
          <Button variant="ghost" size="icon" className="text-white hover:text-[#D4AF37]" data-testid="cart-button" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-6 w-6" />
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white hover:text-[#D4AF37]" data-testid="cart-button-mobile" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart className="h-6 w-6" />
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white" data-testid="mobile-menu-button">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#800020] text-white w-[250px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 pt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-lg hover:text-[#D4AF37] transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={link.dataTestId}
                  >
                    {link.name}
                  </Link>
                ))}
                {isAuthenticated && user?.role === 'ADMIN' && (
                  <>
                    <Separator className="bg-gray-600" />
                    <span className="text-gray-400 text-sm">Admin Links</span>
                    {adminNavLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="text-lg hover:text-[#D4AF37] transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                        data-testid={link.dataTestId}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </>
                )}
                <Separator className="bg-gray-600" />
                {isAuthenticated ? (
                  <>
                    <Link to={ROUTES.ORDER_HISTORY} className="text-lg hover:text-[#D4AF37] transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-order-history-mobile">
                      Order History
                    </Link>
                    <Button onClick={() => { logout(); setIsMobileMenuOpen(false); }} variant="ghost" className="text-white hover:text-[#D4AF37] justify-start px-0" data-testid="logout-button-mobile">
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link to={ROUTES.LOGIN} className="text-lg hover:text-[#D4AF37] transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)} data-testid="nav-login-mobile">
                    Login
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;
