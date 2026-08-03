import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

export default function NotFoundPage(): JSX.Element {
  return (
    <section className="py-16 px-4 text-center">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-[#36454F] mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-[#36454F] mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link to={ROUTES.HOME}>
          <Button className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="back-home-cta">
            Go to Homepage
          </Button>
        </Link>
      </div>
    </section>
  );
}