// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { MenuItemCategoryDto, MenuItemDto } from '@/types/menu';

export const getAllMenuItems = async (): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>('/api/v1/menu/items');
  return response.data;
};

export const getMenuItemById = async (id: string): Promise<MenuItemDto> => {
  const response = await apiClient.get<MenuItemDto>(`/api/v1/menu/items/${id}`);
  return response.data;
};

export const getMenuItemsByCategoryId = async (categoryId: string): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>(`/api/v1/menu/categories/${categoryId}/items`);
  return response.data;
};

export const getAllMenuItemCategories = async (): Promise<MenuItemCategoryDto[]> => {
  const response = await apiClient.get<MenuItemCategoryDto[]>('/api/v1/menu/categories');
  return response.data;
};

export const createMenuItem = async (request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.post<MenuItemDto>('/api/v1/admin/menu/items', request);
  return response.data;
};

export const updateMenuItem = async (id: string, request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.put<MenuItemDto>(`/api/v1/admin/menu/items/${id}`, request);
  return response.data;
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/menu/items/${id}`);
};

export const createMenuItemCategory = async (request: MenuItemCategoryDto): Promise<MenuItemCategoryDto> => {
  const response = await apiClient.post<MenuItemCategoryDto>('/api/v1/admin/menu/categories', request);
  return response.data;
};

export const updateMenuItemCategory = async (id: string, request: MenuItemCategoryDto): Promise<MenuItemCategoryDto> => {
  const response = await apiClient.put<MenuItemCategoryDto>(`/api/v1/admin/menu/categories/${id}`, request);
  return response.data;
};

export const deleteMenuItemCategory = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/menu/categories/${id}`);
};

