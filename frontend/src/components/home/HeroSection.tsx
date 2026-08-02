import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section
      className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Farmaaish Restaurant</h1>
        <p className="text-lg md:text-xl mb-8">
          Experience the Royal Flavors of Mughlai Cuisine
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#D4AF37] hover:bg-[#b8942e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="view-menu-cta">
            <Link to={ROUTES.MENU}>View Our Menu</Link>
          </Button>
          <Button asChild className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="book-table-cta">
            <Link to={ROUTES.RESERVATION}>Book a Table</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}