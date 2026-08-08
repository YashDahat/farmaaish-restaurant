import { Link } from 'react-router-dom';
import { useMenuItems } from '@/hooks/useMenu';
import { ROUTES } from '@/routes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedDishes(): JSX.Element {
  const { data: menuItems, isLoading, isError } = useMenuItems();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">Featured Dishes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="flex flex-col">
                <Skeleton className="w-full h-48 rounded-t-xl" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <div className="p-6 pt-0">
                  <Skeleton className="h-8 w-1/3" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-[#F5F5DC]">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          Failed to load featured dishes. Please try again later.
        </div>
      </section>
    );
  }

  const featuredDishes = menuItems?.slice(0, 6) || [];

  return (
    <section className="py-16 px-4 bg-[#F5F5DC]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">Featured Dishes</h2>
        {featuredDishes.length === 0 ? (
          <div className="text-center text-gray-600">No featured dishes available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <Card key={dish.id} className="flex flex-col transition-all duration-200 hover:shadow-lg">
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="w-full h-48 object-cover rounded-t-xl"
                  data-testid={`featured-dish-image-${dish.id}`}
                />
                <CardHeader>
                  <CardTitle data-testid={`featured-dish-name-${dish.id}`}>{dish.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-[#36454F] leading-relaxed mb-4" data-testid={`featured-dish-description-${dish.id}`}>
                    {dish.description}
                  </p>
                  <p className="text-lg font-bold text-[#D4AF37]" data-testid={`featured-dish-price-${dish.id}`}>
                    {dish.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Button asChild className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="view-menu-cta">
            <Link to={ROUTES.MENU}>View Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}