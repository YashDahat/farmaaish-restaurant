import { useAllMenuItems } from '@/hooks/useMenu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedDishesSection() {
  const { data: menuItems, isLoading, isError } = useAllMenuItems();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50" data-testid="featured-dishes-section">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">Our Signature Creations</h2>
          <p className="text-center text-gray-700 mb-12">
            Savor the rich and aromatic flavors of our most beloved Mughlai dishes, crafted with tradition and passion.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="flex flex-col">
                <Skeleton className="w-full h-48 rounded-t-xl" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !menuItems) {
    return (
      <section className="py-16 px-4 bg-gray-50" data-testid="featured-dishes-section">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          Failed to load featured dishes. Please try again later.
        </div>
      </section>
    );
  }

  const featuredDishes = menuItems.slice(0, 3); // Display top 3 dishes as featured

  return (
    <section className="py-16 px-4 bg-gray-50" data-testid="featured-dishes-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">Our Signature Creations</h2>
        <p className="text-center text-gray-700 mb-12">
          Savor the rich and aromatic flavors of our most beloved Mughlai dishes, crafted with tradition and passion.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish) => (
            <Card key={dish.id} className="flex flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
              <img
                src={dish.imageUrl ?? 'https://via.placeholder.com/400x300?text=Dish+Image'}
                alt={dish.name ?? 'Featured Dish'}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <CardHeader className="flex-grow">
                <CardTitle className="text-xl font-semibold">{dish.name}</CardTitle>
                <CardDescription className="text-gray-600">
                  {dish.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-lg font-bold text-[#D4AF37]">
                  {dish.price?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' }) ?? 'Price N/A'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}