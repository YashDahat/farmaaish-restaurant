import Layout from '@/components/Layout';

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/random/?restaurant-interior')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="about-hero-title">
            Experience the Legacy of Farmaaish Restaurant
          </h1>
          <p className="text-xl md:text-2xl font-medium" data-testid="about-hero-subtitle">
            Where Every Dish Tells a Story of Mughlai Grandeur.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-6" data-testid="about-story-title">
              Our Story: A Journey Through Mughlai Heritage
            </h2>
            <p className="text-[#36454F] leading-relaxed mb-4">
              Farmaaish Restaurant is more than just a dining establishment; it's a culinary journey
              back to the opulent courts of the Mughal Empire. Founded with a passion for preserving
              and presenting the rich flavors of traditional Mughlai cuisine, our story began with a
              simple desire: to share the authentic taste of a bygone era.
            </p>
            <p className="text-[#36454F] leading-relaxed">
              Our founders, deeply rooted in the culinary traditions of India, meticulously
              researched ancient recipes and techniques, bringing them to life with a contemporary
              touch. Every spice, every ingredient, and every cooking method is chosen to reflect
              the grandeur and sophistication that defined Mughlai dining.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img
              src="https://source.unsplash.com/random/?indian-food-history"
              alt="Our Story"
              className="rounded-xl shadow-lg w-full h-auto object-cover"
              data-testid="about-story-image"
            />
          </div>
        </div>
      </section>

      {/* Culinary Philosophy Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] text-center mb-8" data-testid="about-philosophy-title">
            Our Culinary Philosophy: Authenticity, Quality, and Passion
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <h3 className="text-xl font-semibold text-[#36454F] mb-3">Authenticity</h3>
              <p className="text-[#36454F] leading-relaxed">
                We believe in staying true to the original Mughlai recipes, using traditional
                cooking methods passed down through generations. Our chefs are masters of their
                craft, ensuring every dish is a faithful representation of its heritage.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-[#36454F] mb-3">Quality Ingredients</h3>
              <p className="text-[#36454F] leading-relaxed">
                Only the freshest, highest quality ingredients make it into our kitchen. From
                hand-picked spices to premium meats and vegetables, we source with care to deliver
                unforgettable flavors.
              </p>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold text-[#36454F] mb-3">Passion for Perfection</h3>
              <p className="text-[#36454F] leading-relaxed">
                Our team is driven by a deep passion for culinary excellence. Every dish is
                prepared with meticulous attention to detail and a commitment to creating a truly
                memorable dining experience for our guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Ambiance Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#36454F] text-center mb-8" data-testid="about-ambiance-title">
            The Ambiance: Dine in Regal Splendor
          </h2>
          <p className="text-[#36454F] leading-relaxed text-center max-w-3xl mx-auto mb-12">
            Step into Farmaaish and be transported to a world of elegance and grandeur. Our
            interiors are designed to evoke the majestic charm of Mughal palaces, offering a
            luxurious and comfortable setting for your dining pleasure.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <img
              src="https://source.unsplash.com/random/?restaurant-dining-area"
              alt="Dining Area"
              className="rounded-xl shadow-lg w-full h-64 object-cover"
              data-testid="about-ambiance-image-1"
            />
            <img
              src="https://source.unsplash.com/random/?restaurant-decor"
              alt="Restaurant Decor"
              className="rounded-xl shadow-lg w-full h-64 object-cover"
              data-testid="about-ambiance-image-2"
            />
            <img
              src="https://source.unsplash.com/random/?restaurant-lighting"
              alt="Restaurant Lighting"
              className="rounded-xl shadow-lg w-full h-64 object-cover"
              data-testid="about-ambiance-image-3"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;