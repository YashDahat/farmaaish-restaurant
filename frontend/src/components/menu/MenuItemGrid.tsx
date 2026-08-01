import { MenuItemDto } from '@/types/menu';
import { MenuItemCard } from './MenuItemCard';

interface MenuItemGridProps {
  menuItems: MenuItemDto[];
}

export function MenuItemGrid({ menuItems }: MenuItemGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}