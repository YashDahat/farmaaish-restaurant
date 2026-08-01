import { useQuery } from '@tanstack/react-query';
import { getAllGalleryImages } from '@/services/galleryService';
import type { GalleryImageDto } from '@/types/gallery';

export const useAllGalleryImages = () => {
  return useQuery<GalleryImageDto[], Error>({
    queryKey: ['galleryImages'],
    queryFn: getAllGalleryImages,
  });
};