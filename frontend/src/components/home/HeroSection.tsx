import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

export default function HeroSection(): JSX.Element {
  return (
    <section
      className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/hero-bg.webp')" }}
      data-testid="hero-section"
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Experience the Royal Flavors of Farmaaish
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Where every dish tells a story of Mughlai heritage and culinary excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="view-menu-cta">
            <Link to={ROUTES.MENU}>View Our Menu</Link>
          </Button>
          <Button asChild variant="outline" className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="book-table-cta">
            <Link to={ROUTES.RESERVATION}>Book a Table</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}