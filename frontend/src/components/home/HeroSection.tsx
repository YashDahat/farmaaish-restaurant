import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

const HeroSection = () => {
  return (
    <section
      className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80)` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Farmaaish Restaurant: Experience the Royal Flavors of Mughlai Cuisine
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8">
          Where every dish tells a story of tradition and taste.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="menu-cta">
            <Link to={ROUTES.MENU}>View Our Menu</Link>
          </Button>
          <Button asChild className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="book-table-cta">
            <Link to={ROUTES.BOOKING}>Book a Table</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;