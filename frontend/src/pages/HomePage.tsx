import FeaturedDishes from '@/components/home/FeaturedDishes';
import HeroSection from '@/components/home/HeroSection';
import Testimonials from '@/components/home/Testimonials';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="bg-white text-[#36454F]">
      <HeroSection />

      <section className="py-16 px-4 bg-[#F5F5DC]" data-testid="about-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#36454F] mb-6">
            About Farmaaish Restaurant
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            Farmaaish, meaning 'a special request' or 'a wish' in Urdu, is more than just a
            restaurant; it's a culinary journey into the heart of Mughlai royalty. Our chefs
            meticulously craft each dish using age-old recipes and the finest ingredients,
            bringing you an authentic taste of India's rich gastronomic heritage. From aromatic
            biryanis to succulent kebabs and rich curries, every bite is an experience fit for
            kings.
          </p>
          <Button asChild className="bg-[#D4AF37] hover:bg-[#b8942e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="learn-more-cta">
            <Link to={ROUTES.ABOUT}>Learn More</Link>
          </Button>
        </div>
      </section>

      <FeaturedDishes />

      <Testimonials />

      <section className="py-16 px-4 bg-white" data-testid="reservations-cta-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#36454F] mb-6">
            Reserve Your Royal Experience
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            Planning a special occasion or simply craving an unforgettable meal? Book a table
            with us and let Farmaaish transport you to an era of regal dining.
          </p>
          <Button asChild className="bg-[#D4AF37] hover:bg-[#b8942e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="book-now-cta">
            <Link to={ROUTES.RESERVATION}>Book Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}