import ImageGrid from '@/components/gallery/ImageGrid';
import { useGallery } from '@/hooks/useGallery';
import { Skeleton } from '@/components/ui/skeleton';

export default function GalleryPage() {
  const { data: images, isLoading, error } = useGallery();

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">A Glimpse into Farmaaish</h1>
          <p className="text-xl md:text-2xl text-white mt-4">
            Experience the Richness of Mughlai Cuisine and Ambiance
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#36454F] mb-8 text-center">Moments from Farmaaish</h2>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-60 w-full rounded-lg" />
              ))}
            </div>
          )}

          {error && (
            <div className="text-center text-red-600">
              <p>Error loading gallery images: {error.message}</p>
            </div>
          )}

          {images && images.length > 0 && <ImageGrid images={images} />}

          {images && images.length === 0 && !isLoading && (
            <div className="text-center text-gray-600">
              <p>No gallery images available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}