import { useQuery } from '@tanstack/react-query';
import { getAllGalleryImages } from '@/services/galleryService';
import type { GalleryImageDto } from '@/types/gallery';

export function useGallery(): { data: GalleryImageDto[] | undefined; isLoading: boolean; error: Error | null } {
  const { data, isLoading, error } = useQuery<GalleryImageDto[], Error>({
    queryKey: ['galleryImages'],
    queryFn: getAllGalleryImages,
  });

  return { data, isLoading, error };
}