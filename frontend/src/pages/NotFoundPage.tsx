import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import Layout from '@/components/Layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <section className="py-16 px-4 bg-white min-h-[calc(100vh-120px)] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-[#D4AF37] mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-4">Page Not Found</h2>
          <p className="text-lg text-[#36454F] mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          <Button asChild className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="back-home-cta">
            <Link to={ROUTES.HOME}>Go to Homepage</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;