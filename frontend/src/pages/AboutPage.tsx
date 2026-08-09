import { Link } from 'react-router-dom';
import SiteLayout from '@/shell/SiteLayout';
import siteConfig from '@/config/siteConfig';
import { ROUTES } from '@/routes';

export default function AboutPage() {
  return (
    <SiteLayout config={siteConfig}>
      <section className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">About Farmaaish Restaurant</h1>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-[#36454F] leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#800020] mb-6">Our Story & Philosophy</h2>
          <p className="mb-4">
            Farmaaish Restaurant is more than just a dining establishment; it's a journey through the rich culinary heritage of Mughlai cuisine.
            Established with a passion for authentic flavors and a commitment to traditional cooking techniques, Farmaaish brings the grandeur
            of the Mughal era to your plate. Our philosophy is simple: to create an unforgettable dining experience where every dish tells a story
            of tradition, taste, and unparalleled craftsmanship.
          </p>
          <p className="mb-4">
            We believe in preserving the essence of Mughlai cooking, using only the finest ingredients, aromatic spices, and time-honored recipes
            passed down through generations. Our chefs, masters of their craft, meticulously prepare each dish, ensuring a symphony of flavors
            that tantalizes the palate and transports you to a bygone era of royal feasts.
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#800020] mt-10 mb-6">The Authenticity of Mughlai Cuisine</h2>
          <p className="mb-4">
            Mughlai cuisine, born in the imperial kitchens of the Mughal Empire, is renowned for its rich, aromatic, and flavorful dishes.
            It's a fusion of Indian and Persian culinary traditions, characterized by the use of exotic spices, dry fruits, nuts, and dairy products,
            resulting in creamy gravies, succulent meats, and fragrant rice preparations.
          </p>
          <p className="mb-4">
            At Farmaaish, we honor this legacy by staying true to the original methods and ingredients. From slow-cooked biryanis to tender kebabs
            and rich curries, each item on our menu is a testament to the authenticity and complexity of Mughlai gastronomy. We invite you to savor
            the delicate balance of flavors, the intricate textures, and the captivating aromas that define this royal cuisine.
          </p>

          <div className="mt-10 text-center">
            <Link
              to={ROUTES.GALLERY}
              className="inline-flex items-center justify-center bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              data-testid="about-gallery-cta"
            >
              Explore Our Gallery
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}