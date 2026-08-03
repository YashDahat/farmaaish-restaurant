import React, { useState } from 'react';
import { useMenuItems, useMenuItemCategories } from '@/hooks/useMenu';
import MenuCategoryTabs from '@/components/menu/MenuCategoryTabs';
import MenuItemCard from '@/components/menu/MenuItemCard';
import { Skeleton } from '@/components/ui/skeleton';
import { MenuItemDto } from '@/types/menu';

export default function MenuPage(): React.JSX.Element {
  const { data: menuItems, isLoading: isLoadingItems, isError: isErrorItems } = useMenuItems();
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useMenuItemCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const filteredMenuItems = selectedCategoryId
    ? menuItems?.filter((item: MenuItemDto) => item.categoryId === selectedCategoryId)
    : menuItems;

  const handleSelectCategory = (categoryId: number | null): void => {
    setSelectedCategoryId(categoryId);
  };

  if (isErrorItems || isErrorCategories) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-red-600">Error loading menu. Please try again later.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="menu-hero-title">
            Our Exquisite Menu
          </h1>
          <p className="text-lg md:text-xl font-medium">A Culinary Journey Through Mughlai Delicacies</p>
        </div>
      </section>

      {/* Menu Categories and Items Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Explore Our Dishes</h2>

          {isLoadingCategories ? (
            <div className="flex justify-center mb-8">
              <Skeleton className="h-10 w-full max-w-2xl rounded-md" />
            </div>
          ) : (
            categories && (
              <div className="mb-12">
                <MenuCategoryTabs categories={categories} onSelectCategory={handleSelectCategory} />
              </div>
            )
          )}

          {isLoadingItems ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <Skeleton key={index} className="h-[350px] w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMenuItems?.length === 0 ? (
                <div className="col-span-full text-center text-gray-600 text-lg py-8">
                  No items found in this category.
                </div>
              ) : (
                filteredMenuItems?.map((item: MenuItemDto) => (
                  <MenuItemCard key={item.id} menuItem={item} />
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}