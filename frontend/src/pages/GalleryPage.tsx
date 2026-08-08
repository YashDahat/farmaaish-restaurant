import { useGallery } from '@/hooks/useGallery';
import Layout from '@/components/Layout';
import { SiteConfig } from '@/shell/types';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const siteConfig: SiteConfig = {
  header: {
    brandName: 'Farmaaish Restaurant',
    navLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Menu', href: '/menu' },
      { label: 'Booking', href: '/booking' },
      { label: 'Catering', href: '/catering' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Contact', href: '/contact' },
    ],
    ctaButton: { label: 'Order Now' },
  },
  footer: {
    brandName: 'Farmaaish Restaurant',
    tagline: 'Experience the Taste of Tradition',
    address: '123 Spice Route, Culinary City, CA 90210',
    phone: '+1 (555) 123-4567',
    email: 'info@farmaaish.com',
    openingHours: 'Mon-Sun: 11:00 AM - 10:00 PM',
    quickLinks: [
      { label: 'Menu', href: '/menu' },
      { label: 'Reservations', href: '/booking' },
      { label: 'Catering', href: '/catering' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    socialLinks: [
      { platform: 'facebook', url: 'https://www.facebook.com/farmaaish' },
      { platform: 'instagram', url: 'https://www.instagram.com/farmaaish' },
      { platform: 'twitter', url: 'https://twitter.com/farmaaish' },
    ],
    bgClass: 'bg-[#800020]',
    textClass: 'text-white',
    accentClass: 'text-[#D4AF37]',
  },
};

export default function GalleryPage(): JSX.Element {
  const { data: images, isLoading, isError, error } = useGallery();

  return (
    <Layout config={siteConfig}>
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="gallery-hero-title">
            Our Culinary Journey
          </h1>
          <p className="text-lg md:text-xl" data-testid="gallery-hero-description">
            A visual feast of Farmaaish Restaurant's exquisite dishes and inviting ambiance.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <Skeleton className="w-full h-48 rounded-md mb-4" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                </Card>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center text-red-600 text-lg">
              Error loading gallery images: {error?.message}
            </div>
          ) : images && images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((image) => (
                <Card key={image.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-0 overflow-hidden" data-testid={`gallery-image-card-${image.id}`}>
                  <img
                    src={image.imageUrl}
                    alt={image.caption}
                    className="w-full h-64 object-cover"
                    data-testid={`gallery-image-${image.id}`}
                  />
                  <CardContent className="p-4">
                    <p className="text-gray-700 text-center font-medium" data-testid={`gallery-caption-${image.id}`}>
                      {image.caption}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 text-lg">No gallery images available.</div>
          )}
        </div>
      </section>
    </Layout>
  );
}