import { SiteConfig } from '@/shell/types';
import { ROUTES } from '@/routes';

export const siteConfig: SiteConfig = {
  header: {
    brandName: 'Farmaaish',
    navLinks: [
      { label: 'Home', href: ROUTES.HOME },
      { label: 'Menu', href: ROUTES.MENU },
      { label: 'Booking', href: ROUTES.BOOKING },
      { label: 'About', href: ROUTES.ABOUT },
      { label: 'Contact', href: ROUTES.CONTACT },
      { label: 'Gallery', href: ROUTES.GALLERY },
      { label: 'Catering', href: ROUTES.CATERING },
    ],
    ctaButton: {
      label: 'Order Now',
      href: ROUTES.MENU,
    },
  },
  footer: {
    brandName: 'Farmaaish',
    tagline: 'Experience the Grandeur of Mughlai Cuisine',
    address: 'Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069',
    phone: '020 2729 1111',
    email: 'info@farmaaish.com',
    openingHours: 'Open Daily: 12:00 PM - 3:00 PM & 7:00 PM - 11:00 PM',
    quickLinks: [
      { label: 'Home', href: ROUTES.HOME },
      { label: 'Menu', href: ROUTES.MENU },
      { label: 'Booking', href: ROUTES.BOOKING },
      { label: 'About', href: ROUTES.ABOUT },
      { label: 'Contact', href: ROUTES.CONTACT },
      { label: 'Gallery', href: ROUTES.GALLERY },
      { label: 'Catering', href: ROUTES.CATERING },
    ],
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/farmaaish' },
      { platform: 'instagram', url: 'https://instagram.com/farmaaish' },
      { platform: 'twitter', url: 'https://twitter.com/farmaaish' },
    ],
    bgClass: 'bg-[#800020]',
    textClass: 'text-white',
    accentClass: 'text-[#D4AF37]',
  },
  mapCoordinates: {
    latitude: 18.55557,
    longitude: 73.7749,
  },
};