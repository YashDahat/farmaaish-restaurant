import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

export function CallToActionSection() {
  return (
    <section className="py-16 px-4 bg-[#F5F5DC]" data-testid="call-to-action-section">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-8">
          Experience Farmaaish
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-[#D4AF37] hover:bg-[#b08d23] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="reserve-cta">
            <Link to={ROUTES.RESERVATIONS}>Reserve Your Table</Link>
          </Button>
          <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="menu-cta">
            <Link to={ROUTES.MENU}>Explore Our Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}