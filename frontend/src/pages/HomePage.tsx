import HeroSection from '@/components/home/HeroSection';
import FeaturedMenuSection from '@/components/home/FeaturedMenuSection';
import AmbianceGallerySection from '@/components/home/AmbianceGallerySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function HomePage(): JSX.Element {
  return (
    <main>
      <HeroSection />
      <FeaturedMenuSection />
      <AmbianceGallerySection />
      <TestimonialsSection />
    </main>
  );
}