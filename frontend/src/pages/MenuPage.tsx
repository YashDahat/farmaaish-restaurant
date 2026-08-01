import { useState } from 'react';
import Layout from '@/components/Layout';
import { MenuCategoryTabs } from '@/components/menu/MenuCategoryTabs';
import { MenuItemGrid } from '@/components/menu/MenuItemGrid';
import { useAllMenuItems, useMenuItemsByCategory } from '@/hooks/useMenu';
import type { MenuItemCategory } from '@/types/menu';
import { Skeleton } from '@/components/ui/skeleton';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState<MenuItemCategory | 'ALL'>('ALL');

  const { data: allMenuItems, isLoading: isLoadingAll, isError: isErrorAll } = useAllMenuItems();
  const { data: categoryMenuItems, isLoading: isLoadingCategory, isError: isErrorCategory } = useMenuItemsByCategory(activeCategory !== 'ALL' ? activeCategory : ('' as MenuItemCategory));

  const onCategoryChange = (category: MenuItemCategory | 'ALL') => {
    setActiveCategory(category);
  };

  const menuItemsToDisplay = activeCategory === 'ALL' ? allMenuItems : categoryMenuItems;
  const isLoading = activeCategory === 'ALL' ? isLoadingAll : isLoadingCategory;
  const isError = activeCategory === 'ALL' ? isErrorAll : isErrorCategory;

  return (
    <Layout>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#36454F] mb-12" data-testid="menu-page-title">
            Our Culinary Delights
          </h1>

          <div className="mb-12">
            <MenuCategoryTabs activeCategory={activeCategory} onCategoryChange={onCategoryChange} />
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="flex flex-col space-y-3 p-4">
                  <Skeleton className="h-[125px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                  <Skeleton className="h-10 w-[100px] self-end" />
                </Card>
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center text-red-500 text-lg">
              Failed to load menu items. Please try again later.
            </div>
          )}

          {!isLoading && !isError && menuItemsToDisplay && menuItemsToDisplay.length > 0 ? (
            <MenuItemGrid menuItems={menuItemsToDisplay} />
          ) : !isLoading && !isError && (
            <div className="text-center text-gray-600 text-lg">
              No menu items found for this category.
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MenuPage;

import { Card } from '@/components/ui/card';