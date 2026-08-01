import { MenuItemDto } from '@/types/menu';
import MenuItemCard from './MenuItemCard';

interface MenuItemsGridProps {
  items: MenuItemDto[];
}

const MenuItemsGrid: React.FC<MenuItemsGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuItemsGrid;