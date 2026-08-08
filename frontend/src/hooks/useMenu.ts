import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getAllMenuItems,
  getAllMenuItemCategories,
  getMenuItemsByCategoryId,
} from '@/services/menuService';
import type { MenuItemDto, MenuItemCategoryDto } from '@/types/menu';

export function useMenuItems(): UseQueryResult<MenuItemDto[], Error> {
  return useQuery<MenuItemDto[], Error>({
    queryKey: ['menuItems'],
    queryFn: getAllMenuItems,
  });
}

export function useMenuCategories(): UseQueryResult<MenuItemCategoryDto[], Error> {
  return useQuery<MenuItemCategoryDto[], Error>({
    queryKey: ['menuCategories'],
    queryFn: getAllMenuItemCategories,
  });
}

export function useMenuItemsByCategory(categoryId: string): UseQueryResult<MenuItemDto[], Error> {
  return useQuery<MenuItemDto[], Error>({
    queryKey: ['menuItems', categoryId],
    queryFn: () => getMenuItemsByCategoryId(categoryId),
    enabled: !!categoryId,
  });
}