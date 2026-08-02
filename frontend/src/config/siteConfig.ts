import { SiteConfig } from '@/shell/types';
import { ROUTES } from '@/routes';

export const siteConfig: SiteConfig = {
  header: {
    brandName: 'Farmaaish Restaurant',
    navLinks: [
      { label: 'Home', href: ROUTES.HOME },
      { label: 'Menu', href: ROUTES.MENU },
      { label: 'Reservation', href: ROUTES.RESERVATION },
      { label: 'Catering', href: ROUTES.CATERING },
      { label: 'Events', href: ROUTES.EVENTS },
      { label: 'About', href: ROUTES.ABOUT },
      { label: 'Contact', href: ROUTES.CONTACT },
    ],
    ctaButton: { label: 'Book a Table', href: ROUTES.RESERVATION },
    bgClass: 'bg-[#800020]',
    textClass: 'text-white',
    hoverClass: 'hover:text-[#D4AF37]',
    ctaClass: 'bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200',
  },
  footer: {
    brandName: 'Farmaaish Restaurant',
    tagline: 'Experience the Royal Flavors of Mughlai Cuisine',
    address: '123 Royal Lane, Culinary City, CA 90210',
    phone: '+1 (555) 123-4567',
    email: 'info@farmaaish.com',
    openingHours: 'Mon–Thu 11am–10pm | Fri 11am–11pm | Sat–Sun 12pm–11pm',
    quickLinks: [
      { label: 'Home', href: ROUTES.HOME },
      { label: 'Menu', href: ROUTES.MENU },
      { label: 'Reservation', href: ROUTES.RESERVATION },
      { label: 'Events', href: ROUTES.EVENTS },
    ],
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/farmaaish' },
      { platform: 'instagram', url: 'https://instagram.com/farmaaish' },
      { platform: 'twitter', url: 'https://twitter.com/farmaaish' },
    ],
    bgClass: 'bg-[#800020]',
    textClass: 'text-gray-200',
    accentClass: 'hover:text-[#D4AF37]',
  },
};