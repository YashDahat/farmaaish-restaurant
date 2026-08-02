import { useEvents } from '@/hooks/useEvents';
import { Skeleton } from '@/components/ui/skeleton';

export default function EventsPage() {
  const { events, galleryItems, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/events-hero.webp)' }}>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center text-white p-4">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>
        </section>

        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-10 w-80 mx-auto mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-[#F5F5DC]">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-10 w-80 mx-auto mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error loading events: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[#36454F]">
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url(/images/events-hero.webp)' }}
        data-testid="events-hero-section"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="events-hero-title">
            Our Events & Gallery
          </h1>
          <p className="text-lg md:text-xl" data-testid="events-hero-subtitle">
            Experience the vibrant life and exquisite moments at our restaurant.
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-4 bg-white" data-testid="events-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">Upcoming Events</h2>
          {events.length === 0 ? (
            <p className="text-center text-gray-600">No upcoming events at the moment. Please check back later!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg"
                  data-testid={`event-card-${event.id}`}
                >
                  {event.imageUrl && (
                    <img
                      src={event.imageUrl}
                      alt={event.title ?? 'Event image'}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'Date TBD'}
                  </p>
                  <p className="leading-relaxed">{event.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-[#F5F5DC]" data-testid="gallery-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">Our Gallery</h2>
          {galleryItems.length === 0 ? (
            <p className="text-center text-gray-600">No gallery items to display at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-lg shadow-md transition-all duration-200 hover:scale-[1.02]"
                  data-testid={`gallery-item-${item.id}`}
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title ?? 'Gallery image'}
                      className="w-full h-64 object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}