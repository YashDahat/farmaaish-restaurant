import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getPostById } from '@/services/blogService';

export const useAllPosts = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: getAllPosts,
  });
};

export const usePost = (id: string) => {
  return useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });
};