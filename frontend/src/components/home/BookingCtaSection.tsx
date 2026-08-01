import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

export default function BookingCtaSection() {
  return (
    <section
      className="relative py-16 px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1578474846591-0c18f5113b9d?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Reserve Your Table at Farmaaish Restaurant
        </h2>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          Indulge in an unforgettable dining experience. Book your table now.
        </p>
        <Button asChild className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="book-table-cta">
          <Link to={ROUTES.RESERVATION}>Book a Table</Link>
        </Button>
      </div>
    </section>
  );
}