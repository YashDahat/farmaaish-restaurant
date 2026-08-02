// GENERATED from the architecture plan — do not edit by hand.
// The complete navigation contract: every page, its route, and its nav
// metadata. Link via ROUTES.*, render nav from routeTable — never hardcode
// a path string. This file imports NOTHING by design (cycle-safe).

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CATERING: '/catering',
  CONTACT: '/contact',
  EVENTS: '/events',
  LOGIN: '/login',
  MENU: '/menu',
  ORDER: '/order',
  PROFILE: '/profile',
  RESERVATION: '/reservation',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_EVENTS: '/admin/events',
  ADMIN_INQUIRIES: '/admin/inquiries',
  ADMIN_MENU: '/admin/menu',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_RESERVATIONS: '/admin/reservations',
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
  { key: 'CATERING', path: ROUTES.CATERING, page: 'CateringPage', importPath: './pages/CateringPage', label: 'Catering', admin: false, nav: true },
  { key: 'CONTACT', path: ROUTES.CONTACT, page: 'ContactPage', importPath: './pages/ContactPage', label: 'Contact', admin: false, nav: true },
  { key: 'EVENTS', path: ROUTES.EVENTS, page: 'EventsPage', importPath: './pages/EventsPage', label: 'Events', admin: false, nav: true },
  { key: 'LOGIN', path: ROUTES.LOGIN, page: 'LoginPage', importPath: './pages/LoginPage', label: 'Login', admin: false, nav: false },
  { key: 'MENU', path: ROUTES.MENU, page: 'MenuPage', importPath: './pages/MenuPage', label: 'Menu', admin: false, nav: true },
  { key: 'ORDER', path: ROUTES.ORDER, page: 'OrderPage', importPath: './pages/OrderPage', label: 'Order', admin: false, nav: true },
  { key: 'PROFILE', path: ROUTES.PROFILE, page: 'ProfilePage', importPath: './pages/ProfilePage', label: 'Profile', admin: false, nav: true },
  { key: 'RESERVATION', path: ROUTES.RESERVATION, page: 'ReservationPage', importPath: './pages/ReservationPage', label: 'Reservation', admin: false, nav: true },
  { key: 'ADMIN_DASHBOARD', path: ROUTES.ADMIN_DASHBOARD, page: 'AdminDashboardPage', importPath: './pages/AdminDashboardPage', label: 'Dashboard', admin: true, nav: true },
  { key: 'ADMIN_EVENTS', path: ROUTES.ADMIN_EVENTS, page: 'AdminEventsPage', importPath: './pages/AdminEventsPage', label: 'Events', admin: true, nav: true },
  { key: 'ADMIN_INQUIRIES', path: ROUTES.ADMIN_INQUIRIES, page: 'AdminInquiriesPage', importPath: './pages/AdminInquiriesPage', label: 'Inquiries', admin: true, nav: true },
  { key: 'ADMIN_MENU', path: ROUTES.ADMIN_MENU, page: 'AdminMenuPage', importPath: './pages/AdminMenuPage', label: 'Menu', admin: true, nav: true },
  { key: 'ADMIN_ORDERS', path: ROUTES.ADMIN_ORDERS, page: 'AdminOrdersPage', importPath: './pages/AdminOrdersPage', label: 'Orders', admin: true, nav: true },
  { key: 'ADMIN_RESERVATIONS', path: ROUTES.ADMIN_RESERVATIONS, page: 'AdminReservationsPage', importPath: './pages/AdminReservationsPage', label: 'Reservations', admin: true, nav: true },
];
