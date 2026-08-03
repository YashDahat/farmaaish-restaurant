import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createMenuItem,
  createMenuItemCategory,
  deleteMenuItem,
  deleteMenuItemCategory,
  getAllMenuItemCategories,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  updateMenuItemCategory,
} from '@/services/menuService';
import type { MenuItemCategory, MenuItemDto } from '@/types/menu';

export const useMenuItems = (): { data: MenuItemDto[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } => {
  return useQuery<MenuItemDto[], Error>({
    queryKey: ['menuItems'],
    queryFn: getAllMenuItems,
  });
};

export const useMenuItemCategories = (): { data: MenuItemCategory[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } => {
  return useQuery<MenuItemCategory[], Error>({
    queryKey: ['menuItemCategories'],
    queryFn: getAllMenuItemCategories,
  });
};

export const useMenuItem = (id: number): { data: MenuItemDto | undefined; isLoading: boolean; isError: boolean; error: Error | null } => {
  return useQuery<MenuItemDto, Error>({
    queryKey: ['menuItem', id],
    queryFn: () => getMenuItemById(id),
  });
};

export const useCreateMenuItem = (): { mutate: (request: MenuItemDto) => void; isPending: boolean; isError: boolean; isSuccess: boolean; data: MenuItemDto | undefined; error: Error | null } => {
  const queryClient = useQueryClient();
  return useMutation<MenuItemDto, Error, MenuItemDto>({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};

export const useUpdateMenuItem = (): { mutate: (variables: { id: number; request: MenuItemDto }) => void; isPending: boolean; isError: boolean; isSuccess: boolean; data: MenuItemDto | undefined; error: Error | null } => {
  const queryClient = useQueryClient();
  return useMutation<MenuItemDto, Error, { id: number; request: MenuItemDto }>({
    mutationFn: ({ id, request }) => updateMenuItem(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      queryClient.invalidateQueries({ queryKey: ['menuItem'] });
    },
  });
};

export const useDeleteMenuItem = (): { mutate: (id: number) => void; isPending: boolean; isError: boolean; isSuccess: boolean; data: void | undefined; error: Error | null } => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};

export const useCreateMenuItemCategory = (): { mutate: (request: MenuItemCategory) => void; isPending: boolean; isError: boolean; isSuccess: boolean; data: MenuItemCategory | undefined; error: Error | null } => {
  const queryClient = useQueryClient();
  return useMutation<MenuItemCategory, Error, MenuItemCategory>({
    mutationFn: createMenuItemCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItemCategories'] });
    },
  });
};

export const useUpdateMenuItemCategory = (): { mutate: (variables: { id: number; request: MenuItemCategory }) => void; isPending: boolean; isError: boolean; isSuccess: boolean; data: MenuItemCategory | undefined; error: Error | null } => {
  const queryClient = useQueryClient();
  return useMutation<MenuItemCategory, Error, { id: number; request: MenuItemCategory }>({
    mutationFn: ({ id, request }) => updateMenuItemCategory(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItemCategories'] });
    },
  });
};

export const useDeleteMenuItemCategory = (): { mutate: (id: number) => void; isPending: boolean; isError: boolean; isSuccess: boolean; data: void | undefined; error: Error | null } => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteMenuItemCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItemCategories'] });
    },
  });
};