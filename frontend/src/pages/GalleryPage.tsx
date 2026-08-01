import Layout from '@/components/Layout';
import ImageGrid from '@/components/gallery/ImageGrid';
import { useAllGalleryImages } from '@/hooks/useGallery';
import { Skeleton } from '@/components/ui/skeleton';

const GalleryPage: React.FC = () => {
  const { data: images, isLoading, isError } = useAllGalleryImages();

  return (
    <Layout>
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="gallery-hero-title">
            A Glimpse into Farmaaish
          </h1>
          <p className="text-xl text-gray-200">
            Explore our culinary journey and the vibrant atmosphere of our restaurant.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#36454F] mb-4" data-testid="gallery-section-title">
            Our Culinary Journey
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            From exquisite dishes to memorable events, every moment at Farmaaish is captured.
          </p>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <Skeleton key={index} className="w-full h-60 rounded-xl" />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center text-red-600 text-lg">
              Failed to load gallery images. Please try again later.
            </div>
          )}

          {images && images.length > 0 && <ImageGrid images={images} />}

          {images && images.length === 0 && !isLoading && (
            <div className="text-center text-gray-600 text-lg">
              No gallery images available at the moment.
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default GalleryPage;