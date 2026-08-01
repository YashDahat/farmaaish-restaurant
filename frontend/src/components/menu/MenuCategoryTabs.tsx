import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemCategory } from '@/types/menu';
import { cn } from '@/lib/utils';

interface MenuCategoryTabsProps {
  activeCategory: MenuItemCategory | 'ALL';
  onCategoryChange: (category: MenuItemCategory | 'ALL') => void;
}

const categories: (MenuItemCategory | 'ALL')[] = [
  'ALL',
  'APPETIZER',
  'MAIN_COURSE',
  'DESSERT',
  'BEVERAGE',
  'SPECIAL',
  'BREAD',
];

export function MenuCategoryTabs({ activeCategory, onCategoryChange }: MenuCategoryTabsProps) {
  return (
    <Tabs value={activeCategory} onValueChange={(value) => onCategoryChange(value as MenuItemCategory | 'ALL')} className="w-full">
      <TabsList className="flex flex-wrap justify-center gap-2 p-2 bg-gray-100 rounded-lg">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              'px-4 py-2 rounded-md transition-all duration-200',
              activeCategory === category
                ? 'bg-[#D4AF37] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            )}
            data-testid={`menu-category-tab-${category.toLowerCase()}`}
          >
            {category.replace(/_/g, ' ')}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}