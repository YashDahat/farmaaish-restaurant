import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Aisha Khan',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    review:
      'Farmaaish is an absolute culinary delight! The biryani transported me straight to the royal kitchens of Lucknow. Impeccable service and an unforgettable experience.',
  },
  {
    id: 2,
    name: 'Rahul Sharma',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    review:
      'Every dish at Farmaaish is a masterpiece. The flavors are rich, authentic, and perfectly balanced. A must-visit for anyone craving true Mughlai cuisine.',
  },
  {
    id: 3,
    name: 'Priya Singh',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    review:
      'The ambiance is as exquisite as the food. Farmaaish offers a dining experience that is both luxurious and comforting. Highly recommend the kebabs!',
  },
  {
    id: 4,
    name: 'Vikram Patel',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    review:
      'I was thoroughly impressed by the attention to detail and the quality of ingredients. Farmaaish truly lives up to its name, delivering a feast fit for royalty.',
  },
];

export default function TestimonialsSection(): JSX.Element {
  return (
    <section className="bg-white py-16 px-4" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-12">
          What Our Guests Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center">
              <CardContent className="p-0">
                <Avatar className="w-20 h-20 mb-4 border-2 border-[#D4AF37]">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <p className="text-lg font-semibold text-[#36454F] mb-2">{testimonial.name}</p>
                <p className="text-[#36454F] leading-relaxed italic">"{testimonial.review}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}