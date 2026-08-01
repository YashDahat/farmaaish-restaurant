// GENERATED from the architecture plan — do not edit by hand.
// The complete navigation contract: every page, its route, and its nav
// metadata. Link via ROUTES.*, render nav from routeTable — never hardcode
// a path string. This file imports NOTHING by design (cycle-safe).

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  BLOG: '/blog',
  BLOG_POST_DETAIL: '/blog-post/:id',
  CATERING: '/catering',
  CHECKOUT: '/checkout',
  CONTACT: '/contact',
  GALLERY: '/gallery',
  LOGIN: '/login',
  MENU: '/menu',
  ORDER_CONFIRMATION: '/order-confirmation',
  PROFILE: '/profile',
  RESERVATION: '/reservation',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_CATERING_INQUIRIES: '/admin/catering-inquiries',
  ADMIN_GALLERY: '/admin/gallery',
  ADMIN_MENU: '/admin/menu',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_RESERVATIONS: '/admin/reservations',
  ADMIN_TESTIMONIALS: '/admin/testimonials',
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
  { key: 'BLOG_POST_DETAIL', path: ROUTES.BLOG_POST_DETAIL, page: 'BlogPostDetailPage', importPath: './pages/BlogPostDetailPage', label: 'Blog Post', admin: false, nav: false },
  { key: 'CATERING', path: ROUTES.CATERING, page: 'CateringPage', importPath: './pages/CateringPage', label: 'Catering', admin: false, nav: true },
  { key: 'CHECKOUT', path: ROUTES.CHECKOUT, page: 'CheckoutPage', importPath: './pages/CheckoutPage', label: 'Checkout', admin: false, nav: true },
  { key: 'CONTACT', path: ROUTES.CONTACT, page: 'ContactPage', importPath: './pages/ContactPage', label: 'Contact', admin: false, nav: true },
  { key: 'GALLERY', path: ROUTES.GALLERY, page: 'GalleryPage', importPath: './pages/GalleryPage', label: 'Gallery', admin: false, nav: true },
  { key: 'LOGIN', path: ROUTES.LOGIN, page: 'LoginPage', importPath: './pages/LoginPage', label: 'Login', admin: false, nav: false },
  { key: 'MENU', path: ROUTES.MENU, page: 'MenuPage', importPath: './pages/MenuPage', label: 'Menu', admin: false, nav: true },
  { key: 'ORDER_CONFIRMATION', path: ROUTES.ORDER_CONFIRMATION, page: 'OrderConfirmationPage', importPath: './pages/OrderConfirmationPage', label: 'Order Confirmation', admin: false, nav: true },
  { key: 'PROFILE', path: ROUTES.PROFILE, page: 'ProfilePage', importPath: './pages/ProfilePage', label: 'Profile', admin: false, nav: true },
  { key: 'RESERVATION', path: ROUTES.RESERVATION, page: 'ReservationPage', importPath: './pages/ReservationPage', label: 'Reservation', admin: false, nav: true },
  { key: 'ADMIN_DASHBOARD', path: ROUTES.ADMIN_DASHBOARD, page: 'AdminDashboardPage', importPath: './pages/admin/AdminDashboardPage', label: 'Dashboard', admin: true, nav: true },
  { key: 'ADMIN_BLOG', path: ROUTES.ADMIN_BLOG, page: 'AdminBlogPage', importPath: './pages/admin/AdminBlogPage', label: 'Blog', admin: true, nav: true },
  { key: 'ADMIN_CATERING_INQUIRIES', path: ROUTES.ADMIN_CATERING_INQUIRIES, page: 'AdminCateringInquiriesPage', importPath: './pages/admin/AdminCateringInquiriesPage', label: 'Catering Inquiries', admin: true, nav: true },
  { key: 'ADMIN_GALLERY', path: ROUTES.ADMIN_GALLERY, page: 'AdminGalleryPage', importPath: './pages/admin/AdminGalleryPage', label: 'Gallery', admin: true, nav: true },
  { key: 'ADMIN_MENU', path: ROUTES.ADMIN_MENU, page: 'AdminMenuPage', importPath: './pages/admin/AdminMenuPage', label: 'Menu', admin: true, nav: true },
  { key: 'ADMIN_ORDERS', path: ROUTES.ADMIN_ORDERS, page: 'AdminOrdersPage', importPath: './pages/admin/AdminOrdersPage', label: 'Orders', admin: true, nav: true },
  { key: 'ADMIN_RESERVATIONS', path: ROUTES.ADMIN_RESERVATIONS, page: 'AdminReservationsPage', importPath: './pages/admin/AdminReservationsPage', label: 'Reservations', admin: true, nav: true },
  { key: 'ADMIN_TESTIMONIALS', path: ROUTES.ADMIN_TESTIMONIALS, page: 'AdminTestimonialsPage', importPath: './pages/admin/AdminTestimonialsPage', label: 'Testimonials', admin: true, nav: true },
  { key: 'NOT_FOUND', path: ROUTES.NOT_FOUND, page: 'NotFoundPage', importPath: './pages/NotFoundPage', label: 'Not Found', admin: false, nav: false },
];
