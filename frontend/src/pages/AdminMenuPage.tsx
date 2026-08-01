import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';

import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

import { useAllMenuItems } from '@/hooks/useMenu';
import { createMenuItem, updateMenuItem } from '@/services/menuService';
import type { CreateMenuItemRequest, MenuItemDto } from '@/types/menu';

import { MenuTable } from '@/components/menu/MenuTable';
import { MenuItemForm } from '@/components/menu/MenuItemForm';
import { DeleteMenuItemDialog } from '@/components/menu/DeleteMenuItemDialog';

export default function AdminMenuPage() {
  const queryClient = useQueryClient();
  const { menuItems, isLoading, error } = useAllMenuItems();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemDto | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);

  const createMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      toast.success('Menu item created successfully!');
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      setIsFormOpen(false);
    },
    onError: (err) => {
      toast.error(`Failed to create menu item: ${err.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateMenuItemRequest }) =>
      updateMenuItem(id, data),
    onSuccess: () => {
      toast.success('Menu item updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      setIsFormOpen(false);
      setEditingItem(undefined);
    },
    onError: (err) => {
      toast.error(`Failed to update menu item: ${err.message}`);
    },
  });

  const handleCreateNew = () => {
    setEditingItem(undefined);
    setIsFormOpen(true);
  };

  const handleEditItem = (item: MenuItemDto) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    const item = menuItems?.find((i) => i.id === id);
    if (item) {
      setItemToDelete({ id: item.id!, name: item.name! });
      setIsDeleteDialogOpen(true);
    }
  };

  const handleFormSubmit = (data: CreateMenuItemRequest) => {
    if (editingItem?.id) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setEditingItem(undefined);
  };

  if (error) {
    toast.error('Failed to load menu items.');
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Manage Menu</h1>
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Menu</h1>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleCreateNew}
                  className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white"
                  data-testid="add-menu-item-button"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Create New Menu Item'}</DialogTitle>
                </DialogHeader>
                <MenuItemForm
                  initialData={editingItem}
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </DialogContent>
            </Dialog>
          </div>
          <Separator className="mb-6" />

          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <MenuTable
              menuItems={menuItems ?? []}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          )}

          {itemToDelete && (
            <DeleteMenuItemDialog
              isOpen={isDeleteDialogOpen}
              onClose={() => setIsDeleteDialogOpen(false)}
              menuItemId={itemToDelete.id}
              menuItemName={itemToDelete.name}
            />
          )}
        </div>
      </section>
    </AdminLayout>
  );
}