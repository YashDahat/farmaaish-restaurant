import { useQuery } from '@tanstack/react-query';
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
  return useQuery<BlogPostDto, Error, BlogPostDto, (request: BlogPostDto) => Promise<BlogPostDto>>({
    queryKey: ['createBlogPost'],
    queryFn: createBlogPost,
  });
};

export const useUpdateBlogPost = (id: string) => {
  return useQuery<BlogPostDto, Error, BlogPostDto, (request: BlogPostDto) => Promise<BlogPostDto>>({
    queryKey: ['updateBlogPost', id],
    queryFn: (request: BlogPostDto) => updateBlogPost(id, request),
    enabled: !!id,
  });
};

export const useDeleteBlogPost = () => {
  return useQuery<void, Error, void, (id: string) => Promise<void>>({
    queryKey: ['deleteBlogPost'],
    queryFn: deleteBlogPost,
  });
};