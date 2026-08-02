import { useMenu } from '@/hooks/useMenu';
import { useCart } from '@/cart/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CartItem } from '@/cart/types';

export default function FeaturedDishes() {
  const { menuItems, isLoading, isError } = useMenu();
  const { addItem } = useCart();

  const featuredItems = menuItems.filter(item => item.imageUrl).slice(0, 4); // Display up to 4 items with images

  const handleAddToCart = (item: CartItem) => {
    addItem(item);
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="featured-dishes-loading">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#36454F] mb-12">Featured Dishes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <Card key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <Skeleton className="h-48 w-full rounded-md mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <Skeleton className="h-10 w-full rounded-full" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="featured-dishes-error">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <p>Error loading featured dishes. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (featuredItems.length === 0) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="featured-dishes-empty">
        <div className="max-w-7xl mx-auto text-center text-[#36454F]">
          <p>No featured dishes available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white" data-testid="featured-dishes-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#36454F] mb-12">Featured Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item) => (
            <Card key={item.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col" data-testid={`menu-item-card-${item.id}`}>
              {item.imageUrl && (
                <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md">
                  <img
                    src={item.imageUrl}
                    alt={item.name ?? 'Dish image'}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-xl font-semibold text-[#36454F]">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow">
                <CardDescription className="text-[#36454F] leading-relaxed mb-4">{item.description}</CardDescription>
                <p className="text-lg font-bold text-[#D4AF37]">
                  {item.price?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </p>
              </CardContent>
              <CardFooter className="p-0 mt-4">
                <Button
                  className="bg-[#D4AF37] hover:bg-[#b8942e] text-white font-semibold rounded-full px-6 py-2 transition-all duration-200 w-full"
                  onClick={() => handleAddToCart({
                    id: item.id ?? '',
                    name: item.name ?? 'Unknown Item',
                    unitPrice: item.price ?? 0,
                    quantity: 1,
                    imageUrl: item.imageUrl ?? undefined,
                  })}
                  data-testid={`add-to-cart-cta-${item.id}`}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}