import { SiteConfig } from '@/shell/types';
import { ROUTES } from '@/routes';

export const siteConfig: SiteConfig = {
  businessName: 'Farmaaish Restaurant',
  tagline: 'Experience the Royal Flavors of Mughlai Cuisine',
  contactInfo: {
    address: '123 Royal Lane, Culinary City, CA 90210',
    phone: '+1 (555) 123-4567',
    email: 'info@farmaaish.com',
    coordinates: {
      latitude: 34.0736,
      longitude: -118.4004,
    },
    openingHours: [
      { day: 'Monday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Tuesday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Wednesday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Thursday', hours: '11:00 AM - 10:00 PM' },
      { day: 'Friday', hours: '11:00 AM - 11:00 PM' },
      { day: 'Saturday', hours: '12:00 PM - 11:00 PM' },
      { day: 'Sunday', hours: '12:00 PM - 09:00 PM' },
    ],
  },
  socialLinks: [
    { name: 'Facebook', url: 'https://facebook.com/farmaaish', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com/farmaaish', icon: 'instagram' },
    { name: 'Twitter', url: 'https://twitter.com/farmaaish', icon: 'twitter' },
  ],
  mainNav: [
    { path: ROUTES.HOME, name: 'Home' },
    { path: ROUTES.MENU, name: 'Menu' },
    { path: ROUTES.RESERVATION, name: 'Reservation' },
    { path: ROUTES.CATERING, name: 'Catering' },
    { path: ROUTES.EVENTS, name: 'Events' },
    { path: ROUTES.ABOUT, name: 'About' },
    { path: ROUTES.CONTACT, name: 'Contact' },
  ],
  customerNav: [
    { path: ROUTES.PROFILE, name: 'Profile', requiresAuth: true },
    { path: ROUTES.ORDER, name: 'Order', requiresAuth: true },
  ],
  adminNav: [
    { path: ROUTES.ADMIN_DASHBOARD, name: 'Dashboard', requiresAuth: true, requiredRole: 'ADMIN' },
    { path: ROUTES.ADMIN_MENU, name: 'Menu Management', requiresAuth: true, requiredRole: 'ADMIN' },
    { path: ROUTES.ADMIN_RESERVATIONS, name: 'Reservations Management', requiresAuth: true, requiredRole: 'ADMIN' },
    { path: ROUTES.ADMIN_ORDERS, name: 'Orders Management', requiresAuth: true, requiredRole: 'ADMIN' },
    { path: ROUTES.ADMIN_EVENTS, name: 'Events Management', requiresAuth: true, requiredRole: 'ADMIN' },
    { path: ROUTES.ADMIN_INQUIRIES, name: 'Inquiries Management', requiresAuth: true, requiredRole: 'ADMIN' },
  ],
  theme: {
    colors: {
      primary: '#800020', // Maroon
      secondary: '#D4AF37', // Gold
      accent: '#b89a2f', // Darker Gold for hover
      text: '#36454F', // Charcoal
      background: '#F5F5DC', // Cream
      white: '#FFFFFF',
    },
    font: {
      heading: 'Playfair Display, serif',
      body: 'Lato, sans-serif',
    },
    layout: {
      section: 'py-16 px-4',
      container: 'max-w-7xl mx-auto',
    },
    components: {
      navbar: 'bg-[#800020] text-white',
      ctaButton: 'bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200',
      brandTextAccent: 'text-[#D4AF37]',
      card: 'bg-white rounded-xl shadow-md border border-gray-100 p-6',
      heroHeading: 'text-4xl md:text-6xl font-bold text-white',
      bodyText: 'text-[#36454F] leading-relaxed',
    },
  },
};