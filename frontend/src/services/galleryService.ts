// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { GalleryImageDto } from '@/types/gallery';

export const getAllGalleryImages = async (): Promise<GalleryImageDto[]> => {
  const response = await apiClient.get<GalleryImageDto[]>('/api/gallery');
  return response.data;
};

export const uploadGalleryImage = async (request: GalleryImageDto): Promise<GalleryImageDto> => {
  const response = await apiClient.post<GalleryImageDto>('/api/admin/gallery', request);
  return response.data;
};

