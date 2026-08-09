import { useMemo } from 'react';
import { useMenu } from '@/hooks/useMenu';
import { useCart } from '@/cart/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function FeaturedMenuItems() {
  const { menuItems, menuItemsLoading, menuItemsError } = useMenu();
  const { addItem } = useCart();

  const featuredItems = useMemo(() => {
    if (!menuItems) return [];
    // For the homepage, we'll just take the first 6 available items as "featured"
    return menuItems.filter(item => item.isAvailable).slice(0, 6);
  }, [menuItems]);

  if (menuItemsLoading) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="featured-menu-items-loading">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-[#36454F]">Our Signature Dishes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden shadow-md border border-gray-100 p-0">
                <Skeleton className="w-full h-48 rounded-t-xl" />
                <CardHeader className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-10 w-24 rounded-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (menuItemsError) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="featured-menu-items-error">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <p>Error loading featured menu items: {menuItemsError.message}</p>
        </div>
      </section>
    );
  }

  if (!featuredItems || featuredItems.length === 0) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="featured-menu-items-empty">
        <div className="max-w-7xl mx-auto text-center text-[#36454F]">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Signature Dishes</h2>
          <p>No featured menu items available at the moment. Please check back later!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white" data-testid="featured-menu-items-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-[#36454F]">Our Signature Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden rounded-xl shadow-md border border-gray-100 p-0" data-testid={`menu-item-card-${item.id}`}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <CardHeader className="p-4">
                <CardTitle className="text-xl font-semibold text-[#36454F]">{item.name}</CardTitle>
                <p className="text-sm text-gray-600">{item.categoryName}</p>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-[#36454F] leading-relaxed text-sm">{item.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <span className="text-lg font-bold text-[#D4AF37]">
                  ₹{item.price.toFixed(2)}
                </span>
                <Button
                  onClick={() => addItem({
                    id: item.id,
                    name: item.name,
                    unitPrice: item.price,
                    imageUrl: item.imageUrl,
                  }, 1)}
                  className={cn(
                    "bg-[#D4AF37] hover:bg-[#b8952c] text-white font-semibold rounded-full px-4 py-2 transition-all duration-200"
                  )}
                  data-testid={`add-to-cart-button-${item.id}`}
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