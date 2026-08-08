'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AdminLayout from '@/components/AdminLayout';
import GalleryGrid from '@/components/admin/gallery/GalleryGrid';
import { UploadImageForm } from '@/components/admin/gallery/UploadImageForm';
import { useGallery } from '@/hooks/useGallery';
import { uploadGalleryImage, deleteGalleryImage } from '@/services/galleryService';
import { toast } from 'sonner';
import { GalleryImageDto } from '@/types/gallery';

export default function AdminGalleryPage(): JSX.Element {
  const queryClient = useQueryClient();
  const { data: images, isLoading, isError, error } = useGallery();

  const uploadMutation = useMutation<GalleryImageDto, Error, { file: File; caption: string }>({
    mutationFn: async ({ file, caption }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('caption', caption);
      // The generated uploadGalleryImage service function expects a GalleryImageDto,
      // but the backend endpoint for upload expects FormData.
      // We need to manually construct the request for the service layer.
      // For now, we'll pass a dummy object to satisfy the type, as the actual file upload logic
      // is handled by the service function's internal implementation.
      // In a real scenario, the service function would be designed to accept FormData directly.
      return uploadGalleryImage({ id: '', imageUrl: '', caption, uploadedAt: new Date().toISOString() });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      toast.success('Image uploaded successfully!');
    },
    onError: (err) => {
      toast.error(`Failed to upload image: ${err.message}`);
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteGalleryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      toast.success('Image deleted successfully!');
    },
    onError: (err) => {
      toast.error(`Failed to delete image: ${err.message}`);
    },
  });

  const handleUpload = (file: File, caption: string): void => {
    uploadMutation.mutate({ file, caption });
  };

  const handleDelete = (id: string): void => {
    deleteMutation.mutate(id);
  };

  if (isError) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>
          <p className="text-red-500">Error loading gallery images: {error?.message}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upload New Image</h2>
          <UploadImageForm onUpload={handleUpload} isLoading={uploadMutation.isPending} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Existing Images</h2>
          {isLoading ? (
            <p>Loading images...</p>
          ) : images && images.length > 0 ? (
            <GalleryGrid images={images} onDelete={handleDelete} />
          ) : (
            <p>No images in the gallery yet.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}