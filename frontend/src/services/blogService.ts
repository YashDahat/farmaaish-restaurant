// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { PostDto } from '@/types/post';

export const getAllPosts = async (): Promise<PostDto[]> => {
  const response = await apiClient.get<PostDto[]>('/api/v1/blog/posts');
  return response.data;
};

export const getPostById = async (id: string): Promise<PostDto> => {
  const response = await apiClient.get<PostDto>(`/api/v1/blog/posts/${id}`);
  return response.data;
};

export const adminGetAllPosts = async (): Promise<PostDto[]> => {
  const response = await apiClient.get<PostDto[]>('/api/v1/admin/blog/posts');
  return response.data;
};

export const adminGetPostById = async (id: string): Promise<PostDto> => {
  const response = await apiClient.get<PostDto>(`/api/v1/admin/blog/posts/${id}`);
  return response.data;
};

export const createPost = async (request: PostDto): Promise<PostDto> => {
  const response = await apiClient.post<PostDto>('/api/v1/admin/blog/posts', request);
  return response.data;
};

export const updatePost = async (id: string, request: PostDto): Promise<PostDto> => {
  const response = await apiClient.put<PostDto>(`/api/v1/admin/blog/posts/${id}`, request);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/blog/posts/${id}`);
};

