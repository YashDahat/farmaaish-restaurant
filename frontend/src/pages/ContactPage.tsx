import React from 'react';
import Layout from '@/components/Layout'; // Assuming Layout is in shared-ui and available at this path
import MapEmbed from '@/components/contact/MapEmbed';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const ContactPage: React.FC = () => {
  const restaurantName = "Farmaaish Restaurant";
  const latitude = 18.5731; // Example latitude for Pune, Baner Rd
  const longitude = 73.7778; // Example longitude for Pune, Baner Rd

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/random/?restaurant-interior')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="contact-hero-heading">
            Connect With Farmaaish Restaurant
          </h1>
          <p className="text-lg md:text-xl">Your Gateway to Exquisite Mughlai Dining.</p>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-8 text-center">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-[#36454F]">Kundan Garden, Baner Rd, Near Veritas Software, Baner, Pune, Maharashtra 411069</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-[#36454F]">020 2729 1111</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
              <p className="text-[#36454F]">Daily: 12:00 PM - 3:00 PM, 7:00 PM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Send Us a Message (Contact Form) Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-8 text-center">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-[#36454F]">Name</Label>
              <Input id="name" type="text" placeholder="Your Name" className="mt-1" data-testid="contact-name" />
            </div>
            <div>
              <Label htmlFor="email" className="text-[#36454F]">Email</Label>
              <Input id="email" type="email" placeholder="Your Email" className="mt-1" data-testid="contact-email" />
            </div>
            <div>
              <Label htmlFor="subject" className="text-[#36454F]">Subject</Label>
              <Input id="subject" type="text" placeholder="Subject" className="mt-1" data-testid="contact-subject" />
            </div>
            <div>
              <Label htmlFor="message" className="text-[#36454F]">Message</Label>
              <Textarea id="message" placeholder="Your Message" rows={5} className="mt-1" data-testid="contact-message" />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              data-testid="contact-submit"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* Our Location (MapEmbed) Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-8 text-center">Our Location</h2>
          <MapEmbed latitude={latitude} longitude={longitude} restaurantName={restaurantName} />
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;