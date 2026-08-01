import { CateringInquiryForm } from '@/components/catering/CateringInquiryForm';
import Layout from '@/components/Layout';

const CateringPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="catering-hero-headline">
            Experience Farmaaish Catering: Royal Flavors for Your Special Occasions
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            From intimate gatherings to grand celebrations, Farmaaish brings the authentic taste of Mughlai cuisine to your event, crafted with passion and served with elegance.
          </p>
        </div>
      </section>

      {/* Catering Services Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8" data-testid="catering-services-heading">
            Our Catering Services
          </h2>
          <div className="prose lg:prose-xl mx-auto text-[#36454F] leading-relaxed">
            <p>
              At Farmaaish, we believe every event is a unique story waiting to be told, and we're here to make it unforgettable with our exquisite Mughlai cuisine. Our catering services are designed to bring the grandeur and rich flavors of our restaurant directly to your chosen venue.
            </p>
            <p>
              We cater to a diverse range of events, including:
            </p>
            <ul className="list-disc list-inside">
              <li><strong>Weddings & Engagements:</strong> Craft a royal feast for your special day with custom menus that delight every guest.</li>
              <li><strong>Corporate Events:</strong> Impress clients and colleagues with sophisticated dining experiences, from business lunches to grand galas.</li>
              <li><strong>Private Parties:</strong> Whether it's a birthday, anniversary, or any intimate gathering, we ensure a culinary journey that perfectly complements your celebration.</li>
              <li><strong>Festive Occasions:</strong> Celebrate festivals with traditional and authentic dishes, prepared with love and precision.</li>
            </ul>
            <p>
              Our commitment to quality begins with sourcing the finest ingredients, ensuring every dish is a masterpiece of taste and presentation. Our team of experienced chefs, specializing in authentic Mughlai recipes, meticulously prepare each item to perfection. We offer flexible menu customization options to suit your preferences, dietary requirements, and budget, ensuring a truly personalized experience.
            </p>
            <p>
              Beyond the food, our professional service staff ensures seamless execution, allowing you to relax and enjoy your event. Let Farmaaish handle the culinary details, so you can focus on creating cherished memories.
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4" data-testid="catering-inquiry-heading">
            Inquire About Your Event
          </h2>
          <p className="text-center text-[#36454F] mb-8 leading-relaxed">
            Tell us about your event, and our team will get back to you to craft a memorable culinary experience.
          </p>
          <CateringInquiryForm />
        </div>
      </section>
    </Layout>
  );
};

export default CateringPage;