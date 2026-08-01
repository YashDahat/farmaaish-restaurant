import Layout from '@/components/Layout';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { useGalleryItems } from '@/hooks/useGallery';
import { Skeleton } from '@/components/ui/skeleton';

export default function GalleryPage() {
  const { data: galleryItems, isLoading, isError, error } = useGalleryItems();

  return (
    <Layout>
      <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/gallery-hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold" data-testid="gallery-hero-title">Our Gallery</h1>
          <p className="mt-4 text-lg md:text-xl">A visual feast of our culinary creations and ambiance.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">Explore Farmaaish</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="w-full h-80 rounded-xl" />
              ))}
            </div>
          ) : isError ? (
            <div className="text-center text-red-500">
              <p>Error loading gallery items: {error?.message}</p>
            </div>
          ) : galleryItems && galleryItems.length > 0 ? (
            <GalleryGrid items={galleryItems} />
          ) : (
            <div className="text-center text-gray-600">
              <p>No gallery items found.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}