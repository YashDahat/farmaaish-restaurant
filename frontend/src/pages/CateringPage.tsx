import CateringInquiryForm from '@/components/inquiry/CateringInquiryForm';
import { SiteLayout } from '@/shell';
import siteConfig from '@/config/siteConfig';

export default function CateringPage() {
  return (
    <SiteLayout config={siteConfig}>
      <div className="relative h-[500px] md:h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="catering-hero-headline">
              Experience the Grandeur of Farmaaish Catering
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Bring the authentic taste of Mughlai cuisine to your special events.
            </p>
            <a href="#inquiry-form" className="bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="catering-hero-cta">
              Plan Your Event
            </a>
          </div>
        </div>
      </div>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10" data-testid="catering-services-heading">
            Our Catering Services
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Farmaaish Restaurant brings its renowned culinary expertise to your doorstep, offering bespoke catering services for a variety of events. Whether it's an intimate family gathering, a grand wedding celebration, or a corporate event, our team is dedicated to crafting an unforgettable dining experience.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We specialize in authentic Mughlai cuisine, known for its rich flavors, aromatic spices, and royal presentation. Our menus are fully customizable to suit your preferences, dietary requirements, and event theme, ensuring every dish is a masterpiece.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1579684385135-ad38150a06b5?w=800&q=80"
                alt="Catering setup"
                className="rounded-lg shadow-lg object-cover w-full h-64 md:h-80"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10" data-testid="catering-why-choose-heading">
            Why Choose Farmaaish for Your Event?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center transition-all duration-200 hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">Authentic Recipes</h3>
              <p className="text-gray-700 leading-relaxed">
                Savor the true taste of Mughlai cuisine with recipes passed down through generations, prepared with the finest ingredients.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center transition-all duration-200 hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">Experienced Chefs</h3>
              <p className="text-gray-700 leading-relaxed">
                Our team of master chefs brings years of experience in crafting exquisite dishes that delight every palate.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-center transition-all duration-200 hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">Impeccable Service</h3>
              <p className="text-gray-700 leading-relaxed">
                From planning to execution, our dedicated staff ensures seamless service and a flawless event experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="inquiry-form" className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4" data-testid="catering-form-heading">
            Plan Your Event with Us
          </h2>
          <p className="text-lg text-gray-700 text-center mb-10 leading-relaxed">
            Tell us about your event, and our team will get in touch to craft a memorable culinary experience.
          </p>
          <CateringInquiryForm />
        </div>
      </section>
    </SiteLayout>
  );
}