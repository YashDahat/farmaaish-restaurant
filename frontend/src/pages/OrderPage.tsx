import { useState } from 'react';
import { useMenu } from '@/hooks/useMenu';
import MenuCategoryTabs from '@/components/menu/MenuCategoryTabs';
import MenuItemsGrid from '@/components/menu/MenuItemsGrid';
import CartDrawer from '@/components/order/CartDrawer';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrderPage() {
  const { data: menuData, isLoading, error } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = menuData?.categories || [];
  const menuItems = menuData?.menuItems || [];

  const filteredItems = selectedCategory
    ? menuItems.filter((item) => item.categoryId === selectedCategory)
    : menuItems;

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="flex space-x-4 mb-8">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <h2 className="text-2xl font-bold">Error loading menu</h2>
          <p>{error.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4" data-testid="order-page">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800" data-testid="order-page-title">
            Our Delicious Menu
          </h1>
          <CartDrawer />
        </div>

        <MenuCategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <MenuItemsGrid items={filteredItems} />
      </div>
    </section>
  );
}