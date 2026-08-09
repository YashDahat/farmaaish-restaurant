export type { SiteConfig } from '@/shell/types';
import { ROUTES } from '@/routes';
import type { SiteConfig } from '@/shell/types';

export const siteConfig: SiteConfig = {
  header: {
    brandName: 'Farmaaish Restaurant',
    logoUrl: null,
    navLinks: [
      { label: 'Home', href: ROUTES.HOME },
      { label: 'Menu', href: ROUTES.MENU },
      { label: 'Reservations', href: ROUTES.BOOKING },
      { label: 'Order Online', href: ROUTES.ORDER },
      { label: 'Catering', href: ROUTES.CATERING },
      { label: 'Blog', href: ROUTES.BLOG },
      { label: 'Gallery', href: ROUTES.GALLERY },
      { label: 'About', href: ROUTES.ABOUT },
      { label: 'Contact', href: ROUTES.CONTACT },
    ],
    ctaButton: {
      label: 'Order Now',
      href: ROUTES.ORDER,
    },
    bgClass: 'bg-[#800020]',
    textClass: 'text-white',
    hoverClass: 'hover:text-[#D4AF37]',
    ctaClass: 'bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200',
  },
  footer: {
    brandName: 'Farmaaish Restaurant',
    tagline: 'Experience the Royal Flavors of Mughlai Cuisine',
    address: 'Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069',
    phone: '020 2729 1111',
    email: 'info@farmaaish.com',
    openingHours: 'Mon-Sun: 11:00 AM - 11:00 PM',
    quickLinks: [
      { label: 'Home', href: ROUTES.HOME },
      { label: 'Menu', href: ROUTES.MENU },
      { label: 'About Us', href: ROUTES.ABOUT },
      { label: 'Contact Us', href: ROUTES.CONTACT },
      { label: 'Blog', href: ROUTES.BLOG },
      { label: 'Gallery', href: ROUTES.GALLERY },
    ],
    socialLinks: [
      { platform: 'facebook', url: 'https://www.facebook.com/farmaaishrestaurant' },
      { platform: 'instagram', url: 'https://www.instagram.com/farmaaishrestaurant' },
      { platform: 'twitter', url: 'https://twitter.com/farmaaish' },
    ],
    bgClass: 'bg-[#800020]',
    textClass: 'text-white',
    accentClass: 'text-[#D4AF37]',
  },
};

export const businessName: string = 'Farmaaish Restaurant';
export const tagline: string = 'Experience the Royal Flavors of Mughlai Cuisine';
export const description: string = 'Where every dish tells a story of tradition and taste.';
export const phone: string = '020 2729 1111';
export const email: string = 'info@farmaaish.com';
export const address: string = 'Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069';
export const googleMapsEmbedUrl: string = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.169123896767!2d73.7723148148937!3d18.55557008738986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf0170000001%3A0x123456789abcdef0!2sFarmaaish%20Restaurant!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin';
export const whatsappNumber: string = '919876543210';