import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "An unforgettable culinary journey! Farmaaish truly captures the essence of Mughlai dining. The biryani was divine!",
    author: "Priya S.",
  },
  {
    id: 2,
    quote: "Every dish was a masterpiece. The ambiance is perfect for a special occasion. Highly recommend the kebabs!",
    author: "Rahul K.",
  },
  {
    id: 3,
    quote: "Exceptional service and authentic flavors. Farmaaish is now our go-to for Indian cuisine. A truly royal experience!",
    author: "Anjali M.",
  },
  {
    id: 4,
    quote: "The best Mughlai food I've had outside of India. The rich spices and tender meats are simply incredible.",
    author: "David L.",
  },
];

export default function Testimonials(): JSX.Element {
  return (
    <section className="py-16 px-4 bg-white" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-12">What Our Guests Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg" data-testid={`testimonial-card-${testimonial.id}`}>
              <CardContent className="text-center p-0">
                <p className="text-lg italic text-[#36454F] mb-4">"{testimonial.quote}"</p>
                <CardTitle className="text-md font-semibold text-[#D4AF37]">- {testimonial.author}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}