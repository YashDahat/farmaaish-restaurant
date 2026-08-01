import Layout from '@/components/Layout';
import OurStory from '@/components/about/OurStory';
import ChefProfile from '@/components/about/ChefProfile';

const AboutPage = () => {
  return (
    <Layout>
      <section className="relative h-[400px] md:h-[500px] bg-[url('https://via.placeholder.com/1500x500')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="about-hero-title">About Us</h1>
          <p className="text-lg md:text-xl">Discover the story behind Farmaaish Restaurant</p>
        </div>
      </section>

      <OurStory />
      <ChefProfile />
    </Layout>
  );
};

export default AboutPage;