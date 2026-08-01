import { useAllMenuItems } from '@/hooks/useMenu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedMenuItems = () => {
  const { menuItems, isLoading, error } = useAllMenuItems();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="featured-menu-items-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#36454F]">
            Our Signature Dishes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <Skeleton className="h-48 w-full rounded-md mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/4" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="featured-menu-items-section">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          Error loading menu items: {error.message}
        </div>
      </section>
    );
  }

  if (!menuItems || menuItems.length === 0) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="featured-menu-items-section">
        <div className="max-w-7xl mx-auto text-center text-[#36454F]">
          No featured menu items available at the moment.
        </div>
      </section>
    );
  }

  const featured = menuItems.slice(0, 3); // Displaying first 3 as featured

  return (
    <section className="py-16 px-4 bg-white" data-testid="featured-menu-items-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#36454F]">
          Our Signature Dishes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((item) => (
            <Card key={item.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg" data-testid={`menu-item-card-${item.id}`}>
              <CardHeader className="p-0 mb-4">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name ?? 'Menu Item'}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <CardTitle className="text-xl font-bold text-[#36454F]">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-[#36454F] leading-relaxed mb-4">
                  {item.description}
                </CardDescription>
                <p className="text-lg font-semibold text-[#D4AF37]">
                  {item.price?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) ?? 'Price N/A'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenuItems;