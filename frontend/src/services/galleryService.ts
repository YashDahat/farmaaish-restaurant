// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { GalleryItemDto } from '@/types/gallery';

export const getAllGalleryItems = async (): Promise<GalleryItemDto[]> => {
  const response = await apiClient.get<GalleryItemDto[]>('/api/v1/gallery');
  return response.data;
};

export const getGalleryItemsByCategory = async (category: string): Promise<GalleryItemDto[]> => {
  const response = await apiClient.get<GalleryItemDto[]>(`/api/v1/gallery/category/${category}`);
  return response.data;
};

export const getGalleryItemById = async (id: string): Promise<GalleryItemDto> => {
  const response = await apiClient.get<GalleryItemDto>(`/api/v1/gallery/${id}`);
  return response.data;
};

export const createGalleryItem = async (request: GalleryItemDto): Promise<GalleryItemDto> => {
  const response = await apiClient.post<GalleryItemDto>('/api/v1/admin/gallery', request);
  return response.data;
};

export const updateGalleryItem = async (id: string, request: GalleryItemDto): Promise<GalleryItemDto> => {
  const response = await apiClient.put<GalleryItemDto>(`/api/v1/admin/gallery/${id}`, request);
  return response.data;
};

export const deleteGalleryItem = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/gallery/${id}`);
};

