// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { GalleryImageDto } from '@/types/gallery';

export const getAllGalleryImages = async (): Promise<GalleryImageDto[]> => {
  const response = await apiClient.get<GalleryImageDto[]>('/api/v1/gallery');
  return response.data;
};

export const adminGetAllGalleryImages = async (): Promise<GalleryImageDto[]> => {
  const response = await apiClient.get<GalleryImageDto[]>('/api/v1/admin/gallery');
  return response.data;
};

export const getGalleryImageById = async (id: string): Promise<GalleryImageDto> => {
  const response = await apiClient.get<GalleryImageDto>(`/api/v1/admin/gallery/${id}`);
  return response.data;
};

export const createGalleryImage = async (request: GalleryImageDto): Promise<GalleryImageDto> => {
  const response = await apiClient.post<GalleryImageDto>('/api/v1/admin/gallery', request);
  return response.data;
};

export const updateGalleryImage = async (id: string, request: GalleryImageDto): Promise<GalleryImageDto> => {
  const response = await apiClient.put<GalleryImageDto>(`/api/v1/admin/gallery/${id}`, request);
  return response.data;
};

export const deleteGalleryImage = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/gallery/${id}`);
};

