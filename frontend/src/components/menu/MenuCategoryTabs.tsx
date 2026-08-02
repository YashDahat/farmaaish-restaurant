import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemCategory } from '@/types/menu';
import { cn } from '@/lib/utils';

interface MenuCategoryTabsProps {
  categories: MenuItemCategory[];
  activeCategory: string;
  onCategoryChange: (categoryName: string) => void;
}

export default function MenuCategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: MenuCategoryTabsProps) {
  return (
    <Tabs
      value={activeCategory}
      onValueChange={onCategoryChange}
      className="w-full flex justify-center mb-8"
      data-testid="menu-category-tabs"
    >
      <TabsList className="bg-gray-200 p-1 rounded-full shadow-sm">
        {categories.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.name ?? ''}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              activeCategory === category.name
                ? "bg-[#D4AF37] text-white shadow"
                : "text-gray-700 hover:bg-gray-100"
            )}
            data-testid={`category-tab-${category.name?.toLowerCase().replace(/\s/g, '-')}`}
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}