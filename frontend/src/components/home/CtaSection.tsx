import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

export default function CtaSection() {
  return (
    <section className="bg-[#F5F5DC] py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-8">Ready for a Royal Feast?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild className="bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="book-table-cta">
            <Link to={ROUTES.BOOKING}>Book Your Table</Link>
          </Button>
          <Button asChild className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="order-online-cta">
            <Link to={ROUTES.ORDER}>Order Online Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}