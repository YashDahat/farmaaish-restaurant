import { useQuery } from '@tanstack/react-query';
import {
  getAllMenuItems,
  getMenuItemsByCategory,
} from '@/services/menuService';
import type { MenuItemCategory, MenuItemDto } from '@/types/menu';

export const useAllMenuItems = () => {
  return useQuery<MenuItemDto[], Error>({
    queryKey: ['menuItems'],
    queryFn: getAllMenuItems,
  });
};

export const useMenuItemsByCategory = (category: MenuItemCategory) => {
  return useQuery<MenuItemDto[], Error>({
    queryKey: ['menuItems', category],
    queryFn: () => getMenuItemsByCategory(category),
    enabled: !!category,
  });
};