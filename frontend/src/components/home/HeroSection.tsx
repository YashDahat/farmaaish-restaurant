import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

const HeroSection = () => {
  return (
    <section
      className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="hero-headline">
          Experience the Grandeur of Farmaaish Restaurant
        </h1>
        <p className="text-lg md:text-xl mb-8">
          A Culinary Journey Through Royal Mughlai Flavors.
        </p>
        <Button asChild className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="hero-reserve-cta">
          <Link to={ROUTES.RESERVATION}>Reserve Your Table</Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;