import { SiteConfig } from '@/shell/types';
import { ROUTES } from '@/routes';

export const siteConfig: SiteConfig = {
  businessName: 'Farmaaish',
  tagline: 'Experience the Royal Flavors of Farmaaish',
  description: 'Where every dish tells a story of Mughlai heritage and culinary excellence.',
  phone: '+1 (555) 123-4567',
  email: 'info@farmaaish.com',
  address: '123 Royal Lane, Culinary City, CA 90210',
  openingHours: [
    'Monday - Friday: 11:00 AM - 10:00 PM',
    'Saturday - Sunday: 12:00 PM - 11:00 PM',
  ],
  socialLinks: [
    { name: 'Facebook', url: 'https://facebook.com/farmaaish', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com/farmaaish', icon: 'instagram' },
    { name: 'Twitter', url: 'https://twitter.com/farmaaish', icon: 'twitter' },
  ],
  navLinks: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Menu', href: ROUTES.MENU },
    { label: 'Reservation', href: ROUTES.RESERVATION },
    { label: 'Catering', href: ROUTES.CATERING },
    { label: 'About', href: ROUTES.ABOUT },
    { label: 'Contact', href: ROUTES.CONTACT },
  ],
  ctaLink: {
    label: 'Book a Table',
    href: ROUTES.RESERVATION,
  },
  footerNav: [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: ROUTES.ABOUT },
        { label: 'Contact Us', href: ROUTES.CONTACT },
        { label: 'Catering', href: ROUTES.CATERING },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
  ],
  designTokens: {
    navbarBgClass: 'bg-[#800020]',
    navbarTextClass: 'text-white',
    primaryCtaClass: 'bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200',
    secondaryCtaClass: 'border border-[#D4AF37] text-[#D4AF37] font-semibold rounded-full px-8 py-3 transition-all duration-200',
    brandTextAccentClass: 'text-[#D4AF37]',
    sectionOddBgClass: 'bg-[#F5F5DC]',
    sectionEvenBgClass: 'bg-white',
    cardClass: 'bg-white rounded-xl shadow-md border border-gray-100 p-6',
    sectionContainerClass: 'py-16 px-4',
    sectionContentClass: 'max-w-7xl mx-auto',
    heroHeadingClass: 'text-4xl md:text-6xl font-bold text-white',
    bodyTextClass: 'text-[#36454F] leading-relaxed',
  },
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.200155700777!2d-122.41941558468133!3d37.77492947975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858087e9e7b2f3%3A0x1a2b3c4d5e6f7a8b!2sFarmaaish%20Restaurant!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus',
};