import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllMenuCategories, getAllMenuItems } from '@/services/menuService';
import type { MenuCategoryDto, MenuItemDto } from '@/types/menu';

export function useMenu(): {
  categories: MenuCategoryDto[] | undefined;
  categoriesLoading: boolean;
  categoriesError: Error | null;
  menuItems: MenuItemDto[] | undefined;
  menuItemsLoading: boolean;
  menuItemsError: Error | null;
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
} {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery<MenuCategoryDto[], Error>({
    queryKey: ['menuCategories'],
    queryFn: getAllMenuCategories,
  });

  const {
    data: menuItems,
    isLoading: menuItemsLoading,
    error: menuItemsError,
  } = useQuery<MenuItemDto[], Error>({
    queryKey: ['menuItems'],
    queryFn: getAllMenuItems,
  });

  return {
    categories,
    categoriesLoading,
    categoriesError,
    menuItems,
    menuItemsLoading,
    menuItemsError,
    selectedCategory,
    setSelectedCategory,
  };
}