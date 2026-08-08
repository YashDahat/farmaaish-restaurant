import * as React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemCategoryDto } from '@/types/menu';

interface MenuCategoryTabsProps {
  categories: MenuItemCategoryDto[];
  onSelectCategory: (categoryId: string | null) => void;
  selectedCategoryId: string | null;
}

export default function MenuCategoryTabs({
  categories,
  onSelectCategory,
  selectedCategoryId,
}: MenuCategoryTabsProps): React.JSX.Element {
  return (
    <Tabs
      value={selectedCategoryId || 'all'}
      onValueChange={(value) => onSelectCategory(value === 'all' ? null : value)}
      className="w-full"
    >
      <TabsList className="flex flex-wrap justify-center h-auto p-1 bg-gray-100 rounded-lg">
        <TabsTrigger
          value="all"
          className="px-4 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md"
          data-testid="category-tab-all"
        >
          All
        </TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id}
            className="px-4 py-2 text-sm font-medium transition-all duration-200 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md"
            data-testid={`category-tab-${category.name.toLowerCase().replace(/\s/g, '-')}`}
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}