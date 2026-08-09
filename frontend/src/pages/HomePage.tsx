import HeroSection from '@/components/home/HeroSection';
import AboutSnippet from '@/components/home/AboutSnippet';
import FeaturedMenuItems from '@/components/home/FeaturedMenuItems';
import SpecialOffersSection from '@/components/home/SpecialOffersSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <AboutSnippet />
      <FeaturedMenuItems />
      <SpecialOffersSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}