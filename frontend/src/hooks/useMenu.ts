import { useQuery } from '@tanstack/react-query';
import { getAllMenuItemCategories, getAllMenuItems } from '@/services/menuService';
import type { MenuItemCategoryDto, MenuItemDto } from '@/types/menu';

export const useAllMenuItems = () => {
  const { data, isLoading, error } = useQuery<MenuItemDto[]>({
    queryKey: ['menuItems'],
    queryFn: getAllMenuItems,
  });

  const getMenuItemsByCategory = (categoryId: string | null) => {
    if (!data) return [];
    if (!categoryId) return data;
    return data.filter(item => item.categoryId === categoryId);
  };

  return {
    menuItems: data,
    isLoading,
    error,
    getMenuItemsByCategory,
  };
};

export const useAllMenuItemCategories = () => {
  const { data, isLoading, error } = useQuery<MenuItemCategoryDto[]>({
    queryKey: ['menuItemCategories'],
    queryFn: getAllMenuItemCategories,
  });

  return {
    categories: data,
    isLoading,
    error,
  };
};