import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

export default function BookingCallToAction(): JSX.Element {
  return (
    <section className="py-16 px-4 bg-[#F5F5DC]">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-6">
          Reserve Your Table for an Exquisite Dining Experience
        </h2>
        <Button asChild className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="book-now-cta">
          <Link to={ROUTES.BOOKING}>Book Now</Link>
        </Button>
      </div>
    </section>
  );
}