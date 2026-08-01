// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { MenuItemCategory, MenuItemDto } from '@/types/menu';

export const getAllMenuItems = async (): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>('/api/v1/menu');
  return response.data;
};

export const getMenuItemsByCategory = async (category: MenuItemCategory): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>(`/api/v1/menu/category/${category}`);
  return response.data;
};

export const getMenuItemById = async (id: string): Promise<MenuItemDto> => {
  const response = await apiClient.get<MenuItemDto>(`/api/v1/menu/${id}`);
  return response.data;
};

export const adminGetAllMenuItems = async (): Promise<MenuItemDto[]> => {
  const response = await apiClient.get<MenuItemDto[]>('/api/v1/admin/menu');
  return response.data;
};

export const adminGetMenuItemById = async (id: string): Promise<MenuItemDto> => {
  const response = await apiClient.get<MenuItemDto>(`/api/v1/admin/menu/${id}`);
  return response.data;
};

export const createMenuItem = async (request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.post<MenuItemDto>('/api/v1/admin/menu', request);
  return response.data;
};

export const updateMenuItem = async (id: string, request: MenuItemDto): Promise<MenuItemDto> => {
  const response = await apiClient.put<MenuItemDto>(`/api/v1/admin/menu/${id}`, request);
  return response.data;
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/menu/${id}`);
};

