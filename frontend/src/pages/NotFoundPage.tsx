import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-16">
      <h1 className="text-6xl md:text-8xl font-bold text-[#800020] mb-4">404</h1>
      <p className="text-xl md:text-2xl text-[#36454F] mb-8 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to={ROUTES.HOME}>
        <Button
          className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid="go-home-cta"
        >
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
}