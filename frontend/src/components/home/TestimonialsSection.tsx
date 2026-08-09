import { Star } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function TestimonialsSection() {
  const { reviews, isLoading, isError, error } = useReviews();

  if (isError) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-8">
            What Our Guests Say
          </h2>
          <p className="text-red-500">Error loading testimonials: {error?.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#36454F] mb-12">
          What Our Guests Say
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-gray-300 fill-gray-300" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6 flex flex-col justify-between" data-testid="testimonial-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold text-[#36454F] mb-2">
                    {review.authorName}
                  </CardTitle>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="text-[#36454F] leading-relaxed flex-grow">
                  &quot;{review.comment}&quot;
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-[#36454F]">No testimonials available at the moment.</div>
        )}
      </div>
    </section>
  );
}