import MenuCategoryTabs from '@/components/menu/MenuCategoryTabs';
import MenuItemsGrid from '@/components/menu/MenuItemsGrid';
import { useMenu } from '@/hooks/useMenu';
import { Skeleton } from '@/components/ui/skeleton';

export default function MenuPage() {
  const {
    menuCategories,
    menuItems,
    activeCategory,
    setActiveCategory,
    isLoading,
    isError,
    error,
  } = useMenu();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Our Menu</h1>
          <div className="flex justify-center mb-8">
            <Skeleton className="w-3/4 h-10 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-8">Error</h1>
          <p className="text-lg text-gray-700">Failed to load menu: {error?.message || 'Unknown error'}</p>
          <p className="text-gray-600 mt-4">Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Our Menu</h1>
        <MenuCategoryTabs
          categories={menuCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <MenuItemsGrid items={menuItems} />
      </div>
    </section>
  );
}