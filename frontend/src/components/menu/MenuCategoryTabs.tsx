import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemCategory } from '@/types/menu';
import React from 'react';

interface MenuCategoryTabsProps {
  categories: MenuItemCategory[];
  onSelectCategory: (categoryId: number | null) => void;
}

export default function MenuCategoryTabs({ categories, onSelectCategory }: MenuCategoryTabsProps): React.JSX.Element {
  const handleCategoryChange = (value: string): void => {
    if (value === 'all') {
      onSelectCategory(null);
    } else {
      onSelectCategory(Number(value));
    }
  };

  return (
    <Tabs defaultValue="all" onValueChange={handleCategoryChange} className="w-full">
      <TabsList className="flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-lg">
        <TabsTrigger
          value="all"
          className="px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md"
          data-testid="category-tab-all"
        >
          All
        </TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={String(category.id)}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md"
            data-testid={`category-tab-${category.name.toLowerCase().replace(/\s/g, '-')}`}
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}