import CateringInquiryForm from '@/components/catering/CateringInquiryForm';

export default function CateringPage() {
  return (
    <div className="min-h-screen bg-[#F5F5DC]">
      {/* Hero Section */}
      <section
        className="relative h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519708227418-c8fd9a32e156?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Catering & Private Events</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Bring the royal Farmaaish experience to your special occasions.
          </p>
        </div>
      </section>

      {/* Service Offerings Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-[#36454F]">Our Catering Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-[#36454F]">
              <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">Weddings & Receptions</h3>
              <p className="leading-relaxed">
                Make your special day unforgettable with our exquisite Mughlai cuisine. From intimate gatherings to grand celebrations, we craft menus that delight.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-[#36454F]">
              <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">Corporate Events</h3>
              <p className="leading-relaxed">
                Impress your clients and colleagues with a sophisticated dining experience. We cater to conferences, business lunches, and corporate galas.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-[#36454F]">
              <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">Social Gatherings</h3>
              <p className="leading-relaxed">
                Host memorable birthday parties, anniversaries, and family reunions with our customizable catering options.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-[#36454F]">
              <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">Private Dining</h3>
              <p className="leading-relaxed">
                For exclusive events, our private dining rooms offer an intimate setting with personalized service and a bespoke menu.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-[#36454F]">
              <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">Custom Menus</h3>
              <p className="leading-relaxed">
                Work with our culinary team to create a custom menu tailored to your preferences, dietary needs, and event theme.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 text-[#36454F]">
              <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">Full-Service Experience</h3>
              <p className="leading-relaxed">
                From setup to service and cleanup, our professional team ensures a seamless and stress-free event for you and your guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catering Inquiry Form Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-[#36454F]">Inquire About Your Event</h2>
          <CateringInquiryForm />
        </div>
      </section>
    </div>
  );
}