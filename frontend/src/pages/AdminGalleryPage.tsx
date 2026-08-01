import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useGalleryItems } from '@/hooks/useGallery';
import { createGalleryItem, updateGalleryItem, deleteGalleryItem } from '@/services/galleryService';
import type { GalleryItemDto } from '@/types/gallery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

const AdminGalleryPage = () => {
  const { data: galleryItems, isLoading, isError } = useGalleryItems();
  const queryClient = useQueryClient();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItemDto | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');

  const createMutation = useMutation({
    mutationFn: createGalleryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
      toast.success('Gallery item created successfully!');
      setIsFormOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Failed to create gallery item: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: GalleryItemDto }) => updateGalleryItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
      toast.success('Gallery item updated successfully!');
      setIsFormOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(`Failed to update gallery item: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGalleryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryItems'] });
      toast.success('Gallery item deleted successfully!');
      setDeleteItemId(null);
    },
    onError: (error) => {
      toast.error(`Failed to delete gallery item: ${error.message}`);
    },
  });

  const resetForm = () => {
    setEditingItem(null);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setCategory('');
  };

  const handleCreateNew = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleEdit = (item: GalleryItemDto) => {
    setEditingItem(item);
    setTitle(item.title ?? '');
    setDescription(item.description ?? '');
    setImageUrl(item.imageUrl ?? '');
    setCategory(item.category ?? '');
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteItemId(id);
  };

  const confirmDelete = () => {
    if (deleteItemId) {
      deleteMutation.mutate(deleteItemId);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const itemData: GalleryItemDto = {
      id: editingItem?.id ?? null,
      title,
      description,
      imageUrl,
      category,
      uploadDate: editingItem?.uploadDate ?? new Date().toISOString(),
    };

    if (editingItem && editingItem.id) {
      updateMutation.mutate({ id: editingItem.id, data: itemData });
    } else {
      createMutation.mutate(itemData);
    }
  };

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800" data-testid="admin-gallery-title">Gallery Management</h1>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleCreateNew} className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200" data-testid="add-gallery-item-cta">
                  Add New Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Gallery Item' : 'Create New Gallery Item'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" data-testid="gallery-item-title" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" data-testid="gallery-item-description" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="imageUrl" className="text-right">
                      Image URL
                    </Label>
                    <Input id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="col-span-3" data-testid="gallery-item-image-url" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="col-span-3" data-testid="gallery-item-category" />
                  </div>
                  <Button type="submit" className="bg-[#800020] hover:bg-[#66001a] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200" disabled={createMutation.isPending || updateMutation.isPending} data-testid="gallery-item-submit">
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingItem ? 'Save Changes' : 'Create Item'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-40 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : isError ? (
            <p className="text-red-500 text-center">Error loading gallery items.</p>
          ) : galleryItems && galleryItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryItems.map((item) => (
                <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" data-testid="gallery-item-card">
                  <img src={item.imageUrl ?? 'https://via.placeholder.com/300'} alt={item.title ?? 'Gallery Image'} className="w-full h-48 object-cover" />
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 text-sm mb-4">{item.description}</p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(item)} data-testid={`edit-gallery-item-${item.id}`}>
                        Edit
                      </Button>
                      <AlertDialog open={deleteItemId === item.id} onOpenChange={(open) => !open && setDeleteItemId(null)}>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id ?? '')} data-testid={`delete-gallery-item-${item.id}`}>
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the gallery item.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDelete} disabled={deleteMutation.isPending}>
                              {deleteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">No gallery items found. Add one to get started!</p>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminGalleryPage;