import Layout from '@/components/Layout';
import { useAllMenuItemCategories, useAllMenuItems } from '@/hooks/useMenu';
import { MenuCategoryTabs } from '@/components/menu/MenuCategoryTabs';
import MenuItemsGrid from '@/components/menu/MenuItemsGrid';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const MenuPage = () => {
  const { categories, isLoading: isLoadingCategories, error: categoriesError } = useAllMenuItemCategories();
  const { menuItems, isLoading: isLoadingMenuItems, error: menuItemsError, getMenuItemsByCategory } = useAllMenuItems();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  const filteredMenuItems = getMenuItemsByCategory(selectedCategoryId);

  if (isLoadingCategories || isLoadingMenuItems) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Our Menu</h1>
            <div className="flex justify-center mb-8">
              <Skeleton className="h-10 w-full max-w-2xl" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} className="h-[300px] w-full" />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (categoriesError || menuItemsError) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center text-red-500">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Error</h1>
            <p>Failed to load menu data. Please try again later.</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">Our Menu</h1>
          <div className="flex justify-center mb-8">
            {categories && (
              <MenuCategoryTabs categories={categories} onSelectCategory={handleSelectCategory} />
            )}
          </div>
          {filteredMenuItems && filteredMenuItems.length > 0 ? (
            <MenuItemsGrid items={filteredMenuItems} />
          ) : (
            <div className="text-center text-gray-600 py-10">
              <p className="text-lg">No menu items found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MenuPage;