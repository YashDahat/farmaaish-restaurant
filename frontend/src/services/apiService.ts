// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';

export const deleteGalleryImage = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/admin/gallery/${id}`);
};

