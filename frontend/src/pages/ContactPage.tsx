import ContactDetails from '@/components/contact/ContactDetails';
import InteractiveMap from '@/components/contact/InteractiveMap';
import siteConfig from '@/config/siteConfig';

export default function ContactPage(): JSX.Element {
  return (
    <div className="bg-white text-[#36454F]">
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-[#36454F] mb-8">Get in Touch</h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                We'd love to hear from you! Whether you have a question about our menu, want to make a reservation, or simply want to say hello, feel free to reach out. Our team is always ready to assist you.
              </p>
              <ContactDetails config={siteConfig} />
            </div>
            <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${siteConfig.footer.mapCoordinates?.latitude},${siteConfig.footer.mapCoordinates?.longitude}`}
                title="Farmaaish Restaurant Location"
                data-testid="contact-map-inline"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <InteractiveMap />
    </div>
  );
}