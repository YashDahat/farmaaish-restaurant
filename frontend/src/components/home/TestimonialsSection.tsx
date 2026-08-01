import { useAllVisibleTestimonials } from '@/hooks/useTestimonials';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

const TestimonialsSection = () => {
  const { data: testimonials, isLoading, isError } = useAllVisibleTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials && testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000); // Change testimonial every 5 seconds
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">What Our Guests Say</h2>
          <p className="text-gray-700 mb-8">
            Hear from those who have experienced the unparalleled taste and hospitality of Farmaaish Restaurant.
          </p>
          <div className="flex justify-center">
            <Card className="w-full max-w-2xl p-6">
              <CardContent className="flex flex-col items-center justify-center h-48">
                <Skeleton className="w-3/4 h-6 mb-4" />
                <Skeleton className="w-full h-4 mb-2" />
                <Skeleton className="w-full h-4" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !testimonials || testimonials.length === 0) {
    return (
      <section className="py-16 px-4 bg-gray-50" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">What Our Guests Say</h2>
          <p className="text-gray-700 mb-8">
            Hear from those who have experienced the unparalleled taste and hospitality of Farmaaish Restaurant.
          </p>
          <div className="text-center text-gray-600">No testimonials available at the moment.</div>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 px-4 bg-gray-50" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">What Our Guests Say</h2>
        <p className="text-gray-700 mb-8">
          Hear from those who have experienced the unparalleled taste and hospitality of Farmaaish Restaurant.
        </p>
        <div className="flex justify-center">
          <Card className="w-full max-w-2xl p-6 transition-all duration-500 ease-in-out transform hover:scale-105">
            <CardContent className="flex flex-col items-center justify-center h-48">
              <p className="text-lg italic text-gray-700 mb-4">
                &quot;{currentTestimonial.reviewText}&quot;
              </p>
              <p className="text-md font-semibold text-gray-800">
                - {currentTestimonial.customerName}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;