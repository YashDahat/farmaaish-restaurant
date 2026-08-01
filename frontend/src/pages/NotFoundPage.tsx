import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { ROUTES } from '@/routes';

const NotFoundPage = () => {
  return (
    <Layout>
      <section className="py-16 px-4 text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#800020] mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            The culinary journey you sought seems to have taken a detour. Please return to the homepage to discover our exquisite offerings.
          </p>
          <Button asChild className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="back-home-cta">
            <Link to={ROUTES.HOME}>Return to Homepage</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default NotFoundPage;