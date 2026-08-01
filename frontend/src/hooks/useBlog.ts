import { useQuery, useMutation } from '@tanstack/react-query';
import { adminGetAllBlogPosts, adminGetBlogPostById, createBlogPost, deleteBlogPost, getAllBlogPosts, getBlogPostById, updateBlogPost } from '@/services/blogService';
import type { BlogPostDto } from '@/types/blog';

export const useAllBlogPosts = () => {
  return useQuery<BlogPostDto[], Error>({
    queryKey: ['blogPosts'],
    queryFn: getAllBlogPosts,
  });
};

export const useBlogPost = (id: string) => {
  return useQuery<BlogPostDto, Error>({
    queryKey: ['blogPost', id],
    queryFn: () => getBlogPostById(id),
    enabled: !!id,
  });
};

export const useAdminAllBlogPosts = () => {
  return useQuery<BlogPostDto[], Error>({
    queryKey: ['adminBlogPosts'],
    queryFn: adminGetAllBlogPosts,
  });
};

export const useAdminBlogPost = (id: string) => {
  return useQuery<BlogPostDto, Error>({
    queryKey: ['adminBlogPost', id],
    queryFn: () => adminGetBlogPostById(id),
    enabled: !!id,
  });
};

export const useCreateBlogPost = () => {
  return useMutation<BlogPostDto, Error, BlogPostDto>({
    mutationFn: (request: BlogPostDto) => createBlogPost(request),
  });
};

export const useUpdateBlogPost = (id: string) => {
  return useMutation<BlogPostDto, Error, BlogPostDto>({
    mutationFn: (request: BlogPostDto) => updateBlogPost(id, request),
  });
};

export const useDeleteBlogPost = () => {
  return useMutation<void, Error, string>({
    mutationFn: (id: string) => deleteBlogPost(id),
  });
};
