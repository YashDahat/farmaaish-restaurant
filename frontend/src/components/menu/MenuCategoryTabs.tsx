import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { MenuCategoryDto } from '@/types/menu';
import React from 'react';

interface MenuCategoryTabsProps {
  categories: MenuCategoryDto[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function MenuCategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: MenuCategoryTabsProps): React.JSX.Element {
  return (
    <Tabs
      value={selectedCategory || 'all'}
      onValueChange={(value) => onSelectCategory(value === 'all' ? null : value)}
      className="w-full flex justify-center py-8"
      data-testid="menu-category-tabs"
    >
      <TabsList className="bg-white p-1 rounded-full shadow-md flex flex-wrap justify-center gap-2">
        <TabsTrigger
          value="all"
          className="px-4 py-2 rounded-full text-[#36454F] data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white transition-all duration-200"
          data-testid="category-tab-all"
        >
          All
        </TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="px-4 py-2 rounded-full text-[#36454F] data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white transition-all duration-200"
            data-testid={`category-tab-${category.name.toLowerCase().replace(/\s/g, '-')}`}
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}