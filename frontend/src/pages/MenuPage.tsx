import MenuCategoryTabs from '@/components/menu/MenuCategoryTabs';
import MenuItemsGrid from '@/components/menu/MenuItemsGrid';
import { useMenu } from '@/hooks/useMenu';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function MenuPage(): React.JSX.Element {
  const {
    categories,
    categoriesLoading,
    categoriesError,
    menuItems,
    menuItemsLoading,
    menuItemsError,
    selectedCategory,
    setSelectedCategory,
  } = useMenu();

  const filteredMenuItems = selectedCategory
    ? menuItems?.filter((item) => item.categoryId === selectedCategory)
    : menuItems;

  if (categoriesLoading || menuItemsLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center rounded-lg overflow-hidden mb-12">
            <Skeleton className="absolute inset-0 w-full h-full" />
            <div className="relative z-10 text-center">
              <Skeleton className="h-12 w-64 mb-4 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
          </div>
          <Skeleton className="h-12 w-full max-w-2xl mx-auto mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="flex flex-col justify-between">
                <CardHeader>
                  <Skeleton className="w-full h-48 rounded-md mb-4" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categoriesError || menuItemsError) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <p>Error loading menu: {categoriesError?.message || menuItemsError?.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div
          className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center rounded-lg overflow-hidden mb-12"
          style={{ backgroundImage: 'url(/images/menu-hero.jpg)' }}
          data-testid="menu-hero-section"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="menu-hero-title">
              Our Exquisite Menu
            </h1>
            <p className="text-lg md:text-xl font-medium" data-testid="menu-hero-tagline">
              A Culinary Journey Through Mughlai Delicacies
            </p>
          </div>
        </div>

        {/* Menu Categories */}
        {categories && categories.length > 0 && (
          <MenuCategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {/* Menu Items Grid */}
        {filteredMenuItems && filteredMenuItems.length > 0 ? (
          <MenuItemsGrid items={filteredMenuItems} />
        ) : (
          <div className="text-center py-16 text-gray-600" data-testid="no-menu-items-message">
            <p className="text-xl font-semibold">No menu items found for this category.</p>
            <p className="mt-2">Please try another category or check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
}

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';