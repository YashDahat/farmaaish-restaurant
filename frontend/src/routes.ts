// GENERATED from the architecture plan — do not edit by hand.
// The complete navigation contract: every page, its route, and its nav
// metadata. Link via ROUTES.*, render nav from routeTable — never hardcode
// a path string. This file imports NOTHING by design (cycle-safe).

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  BLOG: '/blog',
  BLOG_DETAIL: '/blog/:id',
  BOOKING: '/booking',
  CATERING: '/catering',
  CHECKOUT: '/checkout',
  CONTACT: '/contact',
  GALLERY: '/gallery',
  LOGIN: '/login',
  MENU: '/menu',
  ORDER: '/order',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_CATERING_INQUIRIES: '/admin/catering-inquiries',
  ADMIN_GALLERY: '/admin/gallery',
  ADMIN_MENU: '/admin/menu',
  ADMIN_OFFERS: '/admin/offers',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_RESERVATIONS: '/admin/reservations',
  ADMIN_REVIEWS: '/admin/reviews',
  NOT_FOUND: '*',
} as const;

export interface RouteEntry {
  key: keyof typeof ROUTES;
  path: string;
  page: string;        // component name, e.g. 'AdminOrdersPage'
  importPath: string;  // string metadata only — App.tsx does the importing
  label: string;
  admin: boolean;
  nav: boolean;
}

export const routeTable: RouteEntry[] = [
  { key: 'HOME', path: ROUTES.HOME, page: 'HomePage', importPath: './pages/HomePage', label: 'Home', admin: false, nav: true },
  { key: 'ABOUT', path: ROUTES.ABOUT, page: 'AboutPage', importPath: './pages/AboutPage', label: 'About', admin: false, nav: true },
  { key: 'BLOG', path: ROUTES.BLOG, page: 'BlogPage', importPath: './pages/BlogPage', label: 'Blog', admin: false, nav: true },
  { key: 'BLOG_DETAIL', path: ROUTES.BLOG_DETAIL, page: 'BlogDetailPage', importPath: './pages/BlogDetailPage', label: 'Blog', admin: false, nav: false },
  { key: 'BOOKING', path: ROUTES.BOOKING, page: 'BookingPage', importPath: './pages/BookingPage', label: 'Booking', admin: false, nav: true },
  { key: 'CATERING', path: ROUTES.CATERING, page: 'CateringPage', importPath: './pages/CateringPage', label: 'Catering', admin: false, nav: true },
  { key: 'CHECKOUT', path: ROUTES.CHECKOUT, page: 'CheckoutPage', importPath: './pages/CheckoutPage', label: 'Checkout', admin: false, nav: true },
  { key: 'CONTACT', path: ROUTES.CONTACT, page: 'ContactPage', importPath: './pages/ContactPage', label: 'Contact', admin: false, nav: true },
  { key: 'GALLERY', path: ROUTES.GALLERY, page: 'GalleryPage', importPath: './pages/GalleryPage', label: 'Gallery', admin: false, nav: true },
  { key: 'LOGIN', path: ROUTES.LOGIN, page: 'LoginPage', importPath: './pages/LoginPage', label: 'Login', admin: false, nav: false },
  { key: 'MENU', path: ROUTES.MENU, page: 'MenuPage', importPath: './pages/MenuPage', label: 'Menu', admin: false, nav: true },
  { key: 'ORDER', path: ROUTES.ORDER, page: 'OrderPage', importPath: './pages/OrderPage', label: 'Order', admin: false, nav: true },
  { key: 'PROFILE', path: ROUTES.PROFILE, page: 'ProfilePage', importPath: './pages/ProfilePage', label: 'Profile', admin: false, nav: true },
  { key: 'ADMIN_DASHBOARD', path: ROUTES.ADMIN_DASHBOARD, page: 'AdminDashboardPage', importPath: './pages/AdminDashboardPage', label: 'Dashboard', admin: true, nav: true },
  { key: 'ADMIN_BLOG', path: ROUTES.ADMIN_BLOG, page: 'AdminBlogPage', importPath: './pages/AdminBlogPage', label: 'Blog', admin: true, nav: true },
  { key: 'ADMIN_CATERING_INQUIRIES', path: ROUTES.ADMIN_CATERING_INQUIRIES, page: 'AdminCateringInquiriesPage', importPath: './pages/AdminCateringInquiriesPage', label: 'Catering Inquiries', admin: true, nav: true },
  { key: 'ADMIN_GALLERY', path: ROUTES.ADMIN_GALLERY, page: 'AdminGalleryPage', importPath: './pages/AdminGalleryPage', label: 'Gallery', admin: true, nav: true },
  { key: 'ADMIN_MENU', path: ROUTES.ADMIN_MENU, page: 'AdminMenuPage', importPath: './pages/AdminMenuPage', label: 'Menu', admin: true, nav: true },
  { key: 'ADMIN_OFFERS', path: ROUTES.ADMIN_OFFERS, page: 'AdminOffersPage', importPath: './pages/AdminOffersPage', label: 'Offers', admin: true, nav: true },
  { key: 'ADMIN_ORDERS', path: ROUTES.ADMIN_ORDERS, page: 'AdminOrdersPage', importPath: './pages/AdminOrdersPage', label: 'Orders', admin: true, nav: true },
  { key: 'ADMIN_RESERVATIONS', path: ROUTES.ADMIN_RESERVATIONS, page: 'AdminReservationsPage', importPath: './pages/AdminReservationsPage', label: 'Reservations', admin: true, nav: true },
  { key: 'ADMIN_REVIEWS', path: ROUTES.ADMIN_REVIEWS, page: 'AdminReviewsPage', importPath: './pages/AdminReviewsPage', label: 'Reviews', admin: true, nav: true },
  { key: 'NOT_FOUND', path: ROUTES.NOT_FOUND, page: 'NotFoundPage', importPath: './pages/NotFoundPage', label: 'Not Found', admin: false, nav: false },
];
