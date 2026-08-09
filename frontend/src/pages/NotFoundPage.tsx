import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

export default function NotFoundPage() {
  return (
    <section className="py-16 px-4 text-center min-h-[calc(100vh-var(--header-height)-var(--footer-height))] flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold text-[#800020] mb-4" data-testid="notfound-heading">
          404
        </h1>
        <p className="text-xl md:text-2xl text-[#36454F] mb-8" data-testid="notfound-message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button asChild className="bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="notfound-home-button">
          <Link to={ROUTES.HOME}>Go to Homepage</Link>
        </Button>
      </div>
    </section>
  );
}