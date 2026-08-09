// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { MenuCategoryDto, MenuItemDto } from '@/types/menu';

export const getAllMenuCategories = async (): Promise<MenuCategoryDto[]> => {
  const response = await apiClient.get<MenuCategoryDto[]>('/api/v1/menu/categories');
  return response.data;
};

export const getMenuCategoryById = async (categoryId: string): Promise<MenuCategoryDto> => {
  const response = await apiClient.get<MenuCategoryDto>(`/api/v1/menu/categories/${categoryId}`);
  return response.data;
};

export const getAllMenuItems = async (): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>('/api/v1/menu/items');
  return response.data;
};

export const getMenuItemById = async (itemId: string): Promise<MenuItemDto> => {
  const response = await apiClient.get<MenuItemDto>(`/api/v1/menu/items/${itemId}`);
  return response.data;
};

export const adminGetAllMenuCategories = async (): Promise<MenuCategoryDto[]> => {
  const response = await apiClient.get<MenuCategoryDto[]>('/api/admin/menu/categories');
  return response.data;
};

export const adminGetMenuCategoryById = async (categoryId: string): Promise<MenuCategoryDto> => {
  const response = await apiClient.get<MenuCategoryDto>(`/api/admin/menu/categories/${categoryId}`);
  return response.data;
};

export const createMenuCategory = async (request: MenuCategoryDto): Promise<MenuCategoryDto> => {
  const response = await apiClient.post<MenuCategoryDto>('/api/admin/menu/categories', request);
  return response.data;
};

export const updateMenuCategory = async (categoryId: string, request: MenuCategoryDto): Promise<MenuCategoryDto> => {
  const response = await apiClient.put<MenuCategoryDto>(`/api/admin/menu/categories/${categoryId}`, request);
  return response.data;
};

export const adminGetAllMenuItems = async (): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>('/api/admin/menu/items');
  return response.data;
};

export const adminGetMenuItemById = async (itemId: string): Promise<MenuItemDto> => {
  const response = await apiClient.get<MenuItemDto>(`/api/admin/menu/items/${itemId}`);
  return response.data;
};

export const createMenuItem = async (request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.post<MenuItemDto>('/api/admin/menu/items', request);
  return response.data;
};

export const updateMenuItem = async (itemId: string, request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.put<MenuItemDto>(`/api/admin/menu/items/${itemId}`, request);
  return response.data;
};

