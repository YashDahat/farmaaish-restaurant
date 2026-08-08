import type { JSX } from 'react';
import InquiryForm from '@/components/inquiry/InquiryForm';
import CateringInfo from '@/components/inquiry/CateringInfo';

export default function CateringPage(): JSX.Element {
  return (
    <div className="catering-page">
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/catering-hero.webp')" }}
        data-testid="catering-hero-section"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Experience the Grandeur of Farmaaish Catering
          </h1>
          <p className="text-lg md:text-xl">
            Crafting Unforgettable Events with Authentic Mughlai Flavors.
          </p>
        </div>
      </section>

      {/* Catering Information Section */}
      <CateringInfo />

      {/* Inquiry Form Section */}
      <InquiryForm />
    </div>
  );
}