import * as React from 'react';
import { useState } from 'react';
import MenuCategoryTabs from '@/components/menu/MenuCategoryTabs';
import { MenuItemsGrid } from '@/components/menu/MenuItemsGrid';
import { useMenuCategories, useMenuItems, useMenuItemsByCategory } from '@/hooks/useMenu';
import { Skeleton } from '@/components/ui/skeleton';

export default function MenuPage(): React.JSX.Element {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useMenuCategories();
  const { data: allMenuItems, isLoading: isLoadingAllItems, isError: isErrorAllItems } = useMenuItems();
  const { data: itemsByCategory, isLoading: isLoadingItemsByCategory, isError: isErrorItemsByCategory } = useMenuItemsByCategory(selectedCategoryId || '');

  const displayedItems = selectedCategoryId ? itemsByCategory : allMenuItems;
  const isLoadingItems = selectedCategoryId ? isLoadingItemsByCategory : isLoadingAllItems;
  const isErrorItems = selectedCategoryId ? isErrorItemsByCategory : isErrorAllItems;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" data-testid="menu-hero-title">
            Farmaaish Restaurant
          </h1>
          <p className="text-xl md:text-2xl text-white" data-testid="menu-hero-subtitle">
            Experience the Royal Flavors of Mughlai Cuisine.
          </p>
        </div>
      </section>

      {/* Menu Categories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#36454F] mb-8 text-center" data-testid="menu-categories-heading">
            Our Exquisite Menu
          </h2>
          {isLoadingCategories ? (
            <div className="flex justify-center">
              <Skeleton className="w-full max-w-2xl h-10 rounded-lg" />
            </div>
          ) : isErrorCategories ? (
            <p className="text-center text-red-500">Failed to load categories.</p>
          ) : (
            <MenuCategoryTabs
              categories={categories || []}
              onSelectCategory={setSelectedCategoryId}
              selectedCategoryId={selectedCategoryId}
            />
          )}
        </div>
      </section>

      {/* Menu Items Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {isLoadingItems ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="flex flex-col space-y-3 p-4">
                  <Skeleton className="h-[200px] w-full rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </Card>
              ))}
            </div>
          ) : isErrorItems ? (
            <p className="text-center text-red-500">Failed to load menu items.</p>
          ) : (
            <MenuItemsGrid items={displayedItems || []} />
          )}
        </div>
      </section>
    </div>
  );
}