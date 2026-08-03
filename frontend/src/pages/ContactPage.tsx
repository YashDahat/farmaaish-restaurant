import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SiteConfig } from '@/shell/types';
import { MapPin, Phone, Clock } from 'lucide-react';

const siteConfig: SiteConfig = {
  name: "Farmaaish",
  tagline: "Experience the Royal Flavors of Farmaaish",
  businessHours: [
    { day: "Monday", hours: "11:00 AM - 10:00 PM" },
    { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
    { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
    { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
    { day: "Friday", hours: "11:00 AM - 11:00 PM" },
    { day: "Saturday", hours: "11:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "12:00 PM - 09:00 PM" },
  ],
  contact: {
    phone: "+1 (555) 123-4567",
    email: "info@farmaaish.com",
    address: "123 Royal Spice Road, Culinary City, CA 90210",
    mapCoordinates: {
      latitude: 34.0736,
      longitude: -118.4004,
    },
  },
  socialLinks: [
    { name: "Facebook", url: "https://www.facebook.com/farmaaish" },
    { name: "Instagram", url: "https://www.instagram.com/farmaaish" },
    { name: "Twitter", url: "https://twitter.com/farmaaish" },
  ],
  navLinks: [
    { key: "home", label: "Home", href: "/" },
    { key: "menu", label: "Menu", href: "/menu" },
    { key: "reservations", label: "Reservations", href: "/reservation" },
    { key: "catering", label: "Catering", href: "/catering" },
    { key: "about", label: "About", href: "/about" },
    { key: "contact", label: "Contact", href: "/contact" },
  ],
  cta: {
    text: "Order Online",
    href: "/menu",
  },
  footerNav: [
    { key: "home", label: "Home", href: "/" },
    { key: "menu", label: "Menu", href: "/menu" },
    { key: "reservations", label: "Reservations", href: "/reservation" },
    { key: "catering", label: "Catering", href: "/catering" },
    { key: "about", label: "About", href: "/about" },
    { key: "contact", label: "Contact", href: "/contact" },
  ],
  theme: {
    bgClass: "bg-[#F5F5DC]",
    textClass: "text-[#36454F]",
    accentClass: "text-[#D4AF37]",
    navbarBgClass: "bg-[#800020]",
    primaryCtaClass: "bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200",
    secondaryCtaClass: "border border-[#D4AF37] text-[#D4AF37] font-semibold rounded-full px-8 py-3 transition-all duration-200",
  }
};

export default function ContactPage(): JSX.Element {
  const { contact, businessHours, name } = siteConfig;
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${contact.mapCoordinates.latitude},${contact.mapCoordinates.longitude}`;

  return (
    <div className="bg-white text-[#36454F]">
      <section className="relative h-[400px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/contact-hero.webp)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <h1 className="relative z-10 text-4xl md:text-6xl font-bold text-white text-center">
          Contact Us
        </h1>
      </section>

      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#800020]">Get in Touch</h2>
            <p className="text-lg leading-relaxed">
              We'd love to hear from you! Whether you have a question about our menu, want to book a large event, or simply want to share your dining experience, please reach out.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-[#D4AF37] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-semibold">Our Address</h3>
                  <p className="text-lg">{contact.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="text-[#D4AF37] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-semibold">Call Us</h3>
                  <p className="text-lg">{contact.phone}</p>
                  <Button asChild className={siteConfig.theme.primaryCtaClass} data-testid="contact-call-cta">
                    <a href={`tel:${contact.phone}`}>Click to Call</a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="text-[#D4AF37] flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-xl font-semibold">Opening Hours</h3>
                  <ul className="list-none p-0 m-0">
                    {businessHours.map((item, index) => (
                      <li key={index} className="text-lg">
                        <span className="font-medium">{item.day}:</span> {item.hours}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#800020] mb-8">Find Us on the Map</h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${name} Location`}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}