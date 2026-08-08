import { useQuery } from '@tanstack/react-query';
import { getAllGalleryImages } from '@/services/galleryService';
import type { GalleryImageDto } from '@/types/gallery';

export function useGallery(): {
  data: GalleryImageDto[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isError, error } = useQuery<GalleryImageDto[], Error>({
    queryKey: ['galleryImages'],
    queryFn: getAllGalleryImages,
  });

  return { data, isLoading, isError, error };
}