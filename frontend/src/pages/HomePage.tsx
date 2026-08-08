import type { JSX } from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedDishes from '@/components/home/FeaturedDishes';
import Testimonials from '@/components/home/Testimonials';
import BookingCallToAction from '@/components/home/BookingCallToAction';

export default function HomePage(): JSX.Element {
  return (
    <main>
      <HeroSection />
      <FeaturedDishes />
      <Testimonials />
      <BookingCallToAction />
    </main>
  );
}