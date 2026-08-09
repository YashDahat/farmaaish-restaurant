import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getPostById } from '@/services/blogService';
import type { PostDto } from '@/types/blog';

export function useAllPosts(): { data: PostDto[] | undefined; isLoading: boolean; error: Error | null } {
  const { data, isLoading, error } = useQuery<PostDto[], Error>({
    queryKey: ['blogPosts'],
    queryFn: getAllPosts,
  });

  return { data, isLoading, error };
}

export function usePostById(id: string): { data: PostDto | undefined; isLoading: boolean; error: Error | null } {
  const { data, isLoading, error } = useQuery<PostDto, Error>({
    queryKey: ['blogPost', id],
    queryFn: () => getPostById(id),
    enabled: !!id, // Only run the query if id is available
  });

  return { data, isLoading, error };
}