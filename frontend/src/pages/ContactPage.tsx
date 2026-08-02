import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import LocationMap from '@/components/contact/LocationMap';
import { useInquiries } from '@/hooks/useInquiries';
import { InquiryDto } from '@/types/inquiry';
import { toast } from 'sonner';

const formSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number is required').max(15, 'Phone number is too long'),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { createInquiry } = useInquiries();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const inquiry: InquiryDto = {
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        customerPhone: values.customerPhone,
        message: values.message,
        eventType: 'General Inquiry', // Default for contact form
        eventDate: null,
        numberOfGuests: null,
        id: null,
        inquiryDate: null,
        status: 'NEW',
      };
      await createInquiry.mutateAsync(inquiry);
      toast.success('Inquiry submitted successfully!');
      form.reset();
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.');
      console.error('Failed to submit inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-[#36454F]">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-white">We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-[#800020] mb-4">Address</h3>
            <p className="leading-relaxed">Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-[#800020] mb-4">Phone</h3>
            <p className="leading-relaxed">020 2729 1111</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-[#800020] mb-4">Opening Hours</h3>
            <p className="leading-relaxed">Monday - Sunday: 11:00 AM - 11:00 PM</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#800020] mb-8">Send Us a Message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="contact-form">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} data-testid="contact-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your Email" {...field} data-testid="contact-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Your Phone Number" {...field} data-testid="contact-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your Message" rows={5} {...field} data-testid="contact-message" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#b8942e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                disabled={isSubmitting}
                data-testid="contact-submit"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </div>
      </section>

      {/* Location Map Section */}
      <LocationMap />
    </div>
  );
}