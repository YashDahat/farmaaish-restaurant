import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedMenuItems from '@/components/home/FeaturedMenuItems';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { CallToActionSection } from '@/components/home/CallToActionSection';

const HomePage = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedMenuItems />
      <TestimonialsSection />
      <CallToActionSection />
    </Layout>
  );
};

export default HomePage;