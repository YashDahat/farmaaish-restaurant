import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllMenuItemCategories, getAllMenuItems } from '@/services/menuService';
import { MenuItemCategory, MenuItemDto } from '@/types/menu';

export const useMenu = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const {
    data: menuCategories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useQuery<MenuItemCategory[]>({
    queryKey: ['menuCategories'],
    queryFn: getAllMenuItemCategories,
  });

  const {
    data: menuItems = [],
    isLoading: isLoadingItems,
    isError: isErrorItems,
    error: errorItems,
  } = useQuery<MenuItemDto[]>({
    queryKey: ['menuItems'],
    queryFn: getAllMenuItems,
  });

  const filteredMenuItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.categoryName === activeCategory);

  const isLoading = isLoadingCategories || isLoadingItems;
  const isError = isErrorCategories || isErrorItems;
  const error = errorCategories || errorItems;

  return {
    menuCategories: [{ id: 'all', name: 'All', description: 'All Menu Items' }, ...menuCategories],
    menuItems: filteredMenuItems,
    activeCategory,
    setActiveCategory,
    isLoading,
    isError,
    error,
  };
};