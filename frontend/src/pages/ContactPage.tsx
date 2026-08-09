import ContactDetails from '@/components/contact/ContactDetails';
import LocationMap from '@/components/contact/LocationMap';
import { SiteLayout } from '@/shell';
import { siteConfig } from '@/config/siteConfig';

export default function ContactPage() {
  return (
    <SiteLayout config={siteConfig}>
      <section className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')" }}
        data-testid="contact-hero-section"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-xl text-white">We'd love to hear from you!</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F5F5DC]" data-testid="contact-info-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <ContactDetails />
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-[#36454F] mb-6">Send Us a Message</h2>
            <p className="text-[#36454F] leading-relaxed mb-4">
              For any inquiries, feedback, or special requests, please reach out to us.
              We aim to respond to all messages within 24-48 hours.
            </p>
            {siteConfig.footer.email && (
              <a
                href={`mailto:${siteConfig.footer.email}`}
                className="inline-flex items-center justify-center px-8 py-3 text-white font-semibold rounded-full transition-all duration-200 bg-[#D4AF37] hover:bg-[#b8952c]"
                data-testid="contact-email-cta"
              >
                Email Us Directly
              </a>
            )}
          </div>
        </div>
      </section>

      <LocationMap />
    </SiteLayout>
  );
}