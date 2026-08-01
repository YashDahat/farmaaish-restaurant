import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes';
import { useCart } from '@/cart/CartContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: ROUTES.HOME, dataTestId: 'nav-home' },
    { name: 'Menu', path: ROUTES.MENU, dataTestId: 'nav-menu' },
    { name: 'Reservations', path: ROUTES.RESERVATION, dataTestId: 'nav-reservations' },
    { name: 'Catering', path: ROUTES.CATERING, dataTestId: 'nav-catering' },
    { name: 'Blog', path: ROUTES.BLOG, dataTestId: 'nav-blog' },
    { name: 'Gallery', path: ROUTES.GALLERY, dataTestId: 'nav-gallery' },
    { name: 'About', path: ROUTES.ABOUT, dataTestId: 'nav-about' },
    { name: 'Contact', path: ROUTES.CONTACT, dataTestId: 'nav-contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    navigate(ROUTES.CHECKOUT);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#800020] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to={ROUTES.HOME} className="text-2xl font-bold text-[#D4AF37]" data-testid="header-logo">
          Farmaaish
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-[#D4AF37] transition-colors duration-200"
              data-testid={link.dataTestId}
            >
              {link.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.PROFILE} className="hover:text-[#D4AF37] transition-colors duration-200" data-testid="nav-profile">
                My Account
              </Link>
              {user?.role === 'ADMIN' && (
                <Link to={ROUTES.ADMIN_DASHBOARD} className="hover:text-[#D4AF37] transition-colors duration-200" data-testid="nav-admin-dashboard">
                  Admin
                </Link>
              )}
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-white hover:text-[#D4AF37] transition-colors duration-200"
                data-testid="nav-logout-button"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to={ROUTES.LOGIN} className="hover:text-[#D4AF37] transition-colors duration-200" data-testid="nav-login">
              Login
            </Link>
          )}
          <Button
            variant="ghost"
            className="relative text-white hover:text-[#D4AF37] transition-colors duration-200"
            onClick={handleCartClick}
            data-testid="nav-cart-button"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-xs font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center space-x-4">
          <Button
            variant="ghost"
            className="relative text-white hover:text-[#D4AF37] transition-colors duration-200"
            onClick={handleCartClick}
            data-testid="nav-cart-button-mobile"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4AF37] text-xs font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-white hover:text-[#D4AF37]" data-testid="mobile-menu-trigger">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-[#800020] text-white">
              <div className="flex flex-col space-y-4 pt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-lg hover:text-[#D4AF37] transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={link.dataTestId + '-mobile'}
                  >
                    {link.name}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <>
                    <Link
                      to={ROUTES.PROFILE}
                      className="text-lg hover:text-[#D4AF37] transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid="nav-profile-mobile"
                    >
                      My Account
                    </Link>
                    {user?.role === 'ADMIN' && (
                      <Link
                        to={ROUTES.ADMIN_DASHBOARD}
                        className="text-lg hover:text-[#D4AF37] transition-colors duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                        data-testid="nav-admin-dashboard-mobile"
                      >
                        Admin
                      </Link>
                    )}
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="text-lg text-white hover:text-[#D4AF37] transition-colors duration-200 justify-start px-0"
                      data-testid="nav-logout-button-mobile"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link
                    to={ROUTES.LOGIN}
                    className="text-lg hover:text-[#D4AF37] transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid="nav-login-mobile"
                  >
                    Login
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;