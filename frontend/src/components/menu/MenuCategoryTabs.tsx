import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemCategoryDto } from '@/types/menu';
import { useState } from 'react';

interface MenuCategoryTabsProps {
  categories: MenuItemCategoryDto[];
  onSelectCategory: (categoryId: string | null) => void;
}

export const MenuCategoryTabs = ({ categories, onSelectCategory }: MenuCategoryTabsProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string | null) => {
    setActiveCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="flex flex-wrap justify-center gap-2 p-1 bg-gray-100 rounded-lg">
        <TabsTrigger
          value="all"
          onClick={() => handleCategoryClick(null)}
          className={`px-4 py-2 rounded-md transition-all duration-200 ${
            activeCategory === null ? 'bg-[#D4AF37] text-white' : 'bg-transparent text-gray-700 hover:bg-gray-200'
          }`}
          data-testid="category-tab-all"
        >
          All
        </TabsTrigger>
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.id ?? ''}
            onClick={() => handleCategoryClick(category.id ?? '')}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              activeCategory === category.id ? 'bg-[#D4AF37] text-white' : 'bg-transparent text-gray-700 hover:bg-gray-200'
            }`}
            data-testid={`category-tab-${category.name?.toLowerCase().replace(/\s/g, '-')}`}
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};