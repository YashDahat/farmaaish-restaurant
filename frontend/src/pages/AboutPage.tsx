import { SiteConfig } from '@/shell/types';
import Layout from '@/components/Layout';
import siteConfig from '@/config/siteConfig';

export default function AboutPage(): React.ReactElement {
  const config: SiteConfig = siteConfig;

  return (
    <Layout config={config}>
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#800020] mb-8 text-center" data-testid="about-title">
            Our Story: The Essence of Farmaaish
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-[#36454F] leading-relaxed">
              <p>
                Welcome to Farmaaish, where every dish tells a story of rich heritage and culinary passion.
                Our journey began with a simple desire: to bring the authentic, regal flavors of Mughlai cuisine
                to your table. Inspired by the grand feasts of emperors and the intricate art of traditional
                Indian cooking, Farmaaish was founded on the principles of quality, authenticity, and an
                unforgettable dining experience.
              </p>
              <p>
                Our chefs, with years of expertise, meticulously craft each recipe, using only the finest,
                freshest ingredients. From the aromatic spices sourced directly from India to the tender meats
                and vibrant vegetables, every component is chosen to ensure a symphony of flavors that
                transports you to the heart of the Mughal Empire.
              </p>
              <p>
                At Farmaaish, dining is more than just a meal; it's a celebration. It's about gathering with
                loved ones, sharing laughter, and indulging in dishes prepared with love and precision.
                We believe in preserving the age-old techniques while infusing a touch of modern elegance,
                creating a menu that respects tradition yet excites the contemporary palate.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1600891963495-a63398e607d4?w=1920&q=80"
                alt="Farmaaish Restaurant Interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <p className="text-white text-2xl font-semibold text-center p-4">
                  "Where tradition meets taste, and every meal is a masterpiece."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#800020] mb-8 text-center">
            Our Culinary Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#36454F] leading-relaxed">
            <div className="card">
              <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Authenticity</h3>
              <p>
                We are committed to serving authentic Mughlai cuisine, staying true to traditional recipes
                and cooking methods passed down through generations. Our dishes reflect the true essence
                of Indian culinary heritage.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Quality Ingredients</h3>
              <p>
                The foundation of great food lies in great ingredients. We meticulously select the freshest
                produce, premium meats, and aromatic spices to ensure every dish is of the highest quality
                and flavor.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold text-[#D4AF37] mb-3">Exceptional Experience</h3>
              <p>
                Beyond the food, we strive to create an exceptional dining experience. Our warm ambiance,
                attentive service, and exquisite presentation are all designed to make your visit memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#800020] mb-8">
            Join Us on a Culinary Journey
          </h2>
          <p className="text-lg text-[#36454F] leading-relaxed mb-8">
            We invite you to experience the grandeur and rich flavors of Farmaaish. Whether it's a special
            occasion or a casual meal, we promise an unforgettable culinary adventure that will tantalize
            your taste buds and warm your soul.
          </p>
          <a
            href={config.header.navLinks.find(link => link.label === 'Booking')?.href || '#'}
            className="primary-cta"
            data-testid="about-book-now-cta"
          >
            Book Your Table Now
          </a>
        </div>
      </section>
    </Layout>
  );
}