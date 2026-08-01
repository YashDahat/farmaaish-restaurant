import { useQuery } from '@tanstack/react-query';
import { getAllGalleryItems } from '@/services/galleryService';
import type { GalleryItemDto } from '@/types/gallery';

export const useGalleryItems = () => {
  return useQuery<GalleryItemDto[], Error>({
    queryKey: ['galleryItems'],
    queryFn: getAllGalleryItems,
  });
};