import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDishesSection from '@/components/home/FeaturedDishesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import BookingCtaSection from '@/components/home/BookingCtaSection';

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <FeaturedDishesSection />
      <TestimonialsSection />
      <BookingCtaSection />
    </Layout>
  );
}