import type { JSX } from 'react';
import { MenuItemDto } from '@/types/menu';
import MenuItemCard from './MenuItemCard';

interface MenuItemsGridProps {
  items: MenuItemDto[];
}

export function MenuItemsGrid({ items }: MenuItemsGridProps): JSX.Element {
  if (items.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">
        <p>No items found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}