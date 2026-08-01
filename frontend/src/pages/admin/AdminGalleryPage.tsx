import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GalleryImageForm } from '@/components/admin/gallery/GalleryImageForm';
import GalleryImageTable from '@/components/admin/gallery/GalleryImageTable';
import { useAllGalleryImages } from '@/hooks/useGallery';
import { createGalleryImage, updateGalleryImage, deleteGalleryImage } from '@/services/galleryService';
import type { GalleryImageDto } from '@/types/gallery';

const AdminGalleryPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: galleryImages, isLoading, isError } = useAllGalleryImages();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImageDto | null>(null);
  const [imageIdToDelete, setImageIdToDelete] = useState<string | null>(null);

  const createMutation = useMutation({
    mutationFn: createGalleryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      toast.success('Gallery image created successfully.');
      setIsFormOpen(false);
      setSelectedImage(null);
    },
    onError: (error) => {
      toast.error(`Failed to create gallery image: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, request }: { id: string; request: GalleryImageDto }) => updateGalleryImage(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      toast.success('Gallery image updated successfully.');
      setIsFormOpen(false);
      setSelectedImage(null);
    },
    onError: (error) => {
      toast.error(`Failed to update gallery image: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGalleryImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] });
      toast.success('Gallery image deleted successfully.');
      setIsDeleteDialogOpen(false);
      setImageIdToDelete(null);
    },
    onError: (error) => {
      toast.error(`Failed to delete gallery image: ${error.message}`);
    },
  });

  const handleCreateOrUpdate = (data: GalleryImageDto) => {
    if (selectedImage?.id) {
      updateMutation.mutate({ id: selectedImage.id, request: data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (image: GalleryImageDto) => {
    setSelectedImage(image);
    setIsFormOpen(true);
  };

  const handleDelete = (imageId: string) => {
    setImageIdToDelete(imageId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (imageIdToDelete) {
      deleteMutation.mutate(imageIdToDelete);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-6">Manage Gallery Images</h1>
            <div>Loading gallery images...</div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-6">Manage Gallery Images</h1>
            <div>Error loading gallery images.</div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-6">Manage Gallery Images</h1>

          <div className="flex justify-end mb-4">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200"
                  onClick={() => {
                    setSelectedImage(null);
                    setIsFormOpen(true);
                  }}
                  data-testid="create-gallery-image-cta"
                >
                  Add New Image
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{selectedImage ? 'Edit Gallery Image' : 'Create New Gallery Image'}</DialogTitle>
                </DialogHeader>
                <GalleryImageForm initialData={selectedImage ?? undefined} onSubmit={handleCreateOrUpdate} />
              </DialogContent>
            </Dialog>
          </div>

          <GalleryImageTable galleryImages={galleryImages ?? []} onEdit={handleEdit} onDelete={handleDelete} />

          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this gallery image? This action cannot be undone.</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDelete} data-testid="confirm-delete-gallery-image-button">
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminGalleryPage;