import type { JSX } from 'react';
import React from 'react';

export default function TestimonialsSection(): JSX.Element {
  return (
    <section className="py-16 px-4 bg-[#F5F5DC]" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-12">What Our Guests Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg">
            <p className="text-[#36454F] leading-relaxed italic mb-4">
              "Farmaaish Restaurant offers an unparalleled dining experience. The Mughlai cuisine is authentic and exquisite, truly a feast for the senses!"
            </p>
            <p className="font-semibold text-[#D4AF37]">- Priya Sharma</p>
          </div>
    
          {/* Testimonial 2 */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg">
            <p className="text-[#36454F] leading-relaxed italic mb-4">
              "Every dish tells a story of rich heritage and flavor. The ambiance is perfect for a special occasion. Highly recommended!"
            </p>
            <p className="font-semibold text-[#D4AF37]">- Rahul Singh</p>
          </div>
    
          {/* Testimonial 3 */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg">
            <p className="text-[#36454F] leading-relaxed italic mb-4">
              "From the moment we walked in, we were treated like royalty. The food was divine, especially the biryani. A must-visit in Pune!"
            </p>
            <p className="font-semibold text-[#D4AF37]">- Anjali Mehta</p>
          </div>
        </div>
      </div>
    </section>
  );
}
