import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Priya Sharma',
      review:
        'Farmaaish is an absolute culinary delight! The flavors transported me straight to the royal kitchens of India. Impeccable service and an unforgettable dining experience.',
      rating: 5,
    },
    {
      name: 'Rahul Singh',
      review:
        'Every dish at Farmaaish tells a story. The biryani was exquisite, and the ambiance was perfect for a special evening. Highly recommend for authentic Mughlai cuisine.',
      rating: 5,
    },
    {
      name: 'Anjali Desai',
      review:
        'Warm, sophisticated, and inviting. Farmaaish exceeded all my expectations. The staff were incredibly attentive, and the food was simply divine. A must-visit!',
      rating: 5,
    },
    {
      name: 'Vikram Kumar',
      review:
        'The best Mughlai food I have had in a long time. The richness of the curries and the tenderness of the meat were outstanding. Farmaaish truly lives up to its name.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#F5F5DC]" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#36454F] mb-12">
          What Our Guests Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6" data-testid={`testimonial-card-${index}`}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#36454F]">
                  {testimonial.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[#36454F] leading-relaxed">
                <p className="mb-4">"{testimonial.review}"</p>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#D4AF37] fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.917 1.48-8.279L.001 9.306l8.332-1.151L12 .587z" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}