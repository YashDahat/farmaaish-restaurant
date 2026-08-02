// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { MenuItemCategory, MenuItemDto } from '@/types/menu';

export const getAllMenuItems = async (): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>('/api/menu/items');
  return response.data;
};

export const getMenuItemById = async (id: string): Promise<MenuItemDto> => {
  const response = await apiClient.get<MenuItemDto>(`/api/menu/items/${id}`);
  return response.data;
};

export const getMenuItemsByCategoryId = async (categoryId: string): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>(`/api/menu/items/category/${categoryId}`);
  return response.data;
};

export const getAllMenuItemCategories = async (): Promise<MenuItemCategory[]> => {
  const response = await apiClient.get<MenuItemCategory[]>('/api/menu/categories');
  return response.data;
};

export const getMenuItemCategoryById = async (id: string): Promise<MenuItemCategory> => {
  const response = await apiClient.get<MenuItemCategory>(`/api/menu/categories/${id}`);
  return response.data;
};

export const createMenuItem = async (request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.post<MenuItemDto>('/api/admin/menu/items', request);
  return response.data;
};

export const updateMenuItem = async (id: string, request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.put<MenuItemDto>(`/api/admin/menu/items/${id}`, request);
  return response.data;
};

export const createMenuItemCategory = async (request: MenuItemCategory): Promise<MenuItemCategory> => {
  const response = await apiClient.post<MenuItemCategory>('/api/admin/menu/categories', request);
  return response.data;
};

export const updateMenuItemCategory = async (id: string, request: MenuItemCategory): Promise<MenuItemCategory> => {
  const response = await apiClient.put<MenuItemCategory>(`/api/admin/menu/categories/${id}`, request);
  return response.data;
};

