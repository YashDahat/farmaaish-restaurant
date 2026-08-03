import { useMenuItems } from '@/hooks/useMenu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/cart/CartContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import type { MenuItemDto } from '@/types/menu';

const MenuItemCard = ({ item }: { item: MenuItemDto }): JSX.Element => {
  const { addItem } = useCart();

  const handleAddToCart = (): void => {
    addItem({
      id: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity: 1,
      imageUrl: item.imageUrl,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-md border border-gray-100 bg-white transition-all duration-200 hover:shadow-lg" data-testid={`menu-item-card-${item.id}`}>
      <img src={item.imageUrl} alt={item.name} className="h-48 w-full object-cover" />
      <CardHeader className="flex-grow">
        <CardTitle className="text-xl font-semibold text-[#36454F]">{item.name}</CardTitle>
        <CardDescription className="text-sm text-[#36454F]">{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-bold text-[#D4AF37]">₹{item.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid={`add-to-order-button-${item.id}`}
        >
          Add to Order
        </Button>
      </CardFooter>
    </Card>
  );
};

const FeaturedMenuSection = (): JSX.Element => {
  const { data: menuItems, isLoading, isError } = useMenuItems();

  const featuredItems = menuItems?.slice(0, 6) || [];

  return (
    <section className="bg-[#F5F5DC] py-16 px-4" data-testid="featured-menu-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-semibold text-[#36454F] mb-12">
          Our Signature Dishes
        </h2>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-96 w-full rounded-xl" />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center text-red-600">
            Failed to load menu items. Please try again later.
          </div>
        )}

        {!isLoading && !isError && featuredItems.length === 0 && (
          <div className="text-center text-[#36454F]">
            No featured menu items available at the moment.
          </div>
        )}

        {!isLoading && !isError && featuredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to={ROUTES.MENU}>
            <Button
              className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              data-testid="view-full-menu-cta"
            >
              View Full Menu
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenuSection;