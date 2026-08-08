import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import AdminLayout from '@/components/AdminLayout';
import MenuTable from '@/components/admin/menu/MenuTable';
import { MenuItemForm } from '@/components/admin/menu/MenuItemForm';
import { DeleteMenuItemDialog } from '@/components/admin/menu/DeleteMenuItemDialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlusCircleIcon } from 'lucide-react';

import { useMenuItems } from '@/hooks/useMenu';
import { createMenuItem, updateMenuItem, deleteMenuItem } from '@/services/menuService';
import type { MenuItemDto } from '@/types/menu';

export default function AdminMenuPage(): JSX.Element {
  const queryClient = useQueryClient();
  const { data: menuItems, isLoading, isError, error } = useMenuItems();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<MenuItemDto | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItemDto | null>(null);

  const createMutation = useMutation<MenuItemDto, Error, MenuItemDto>({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu item created successfully!');
      setIsFormOpen(false);
      setEditingItem(null);
    },
    onError: (err) => {
      toast.error(`Failed to create menu item: ${err.message}`);
    },
  });

  const updateMutation = useMutation<MenuItemDto, Error, MenuItemDto>({
    mutationFn: (item) => updateMenuItem(item.id, item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu item updated successfully!');
      setIsFormOpen(false);
      setEditingItem(null);
    },
    onError: (err) => {
      toast.error(`Failed to update menu item: ${err.message}`);
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success('Menu item deleted successfully!');
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    },
    onError: (err) => {
      toast.error(`Failed to delete menu item: ${err.message}`);
    },
  });

  const handleCreateNew = (): void => {
    setEditingItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item: MenuItemDto): void => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string): void => {
    const item = menuItems?.find((i) => i.id === id);
    if (item) {
      setItemToDelete(item);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = (id: string): void => {
    deleteMutation.mutate(id);
  };

  const handleSaveMenuItem = (item: MenuItemDto): void => {
    if (item.id) {
      updateMutation.mutate(item);
    } else {
      createMutation.mutate(item);
    }
  };

  const handleCloseForm = (): void => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-10">
          <p>Loading menu items...</p>
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-10">
          <p className="text-red-500">Error loading menu items: {error?.message}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#36454F]">Menu Management</h1>
          <Button
            onClick={handleCreateNew}
            className="bg-[#D4AF37] hover:bg-[#C2A032] text-[#36454F] font-medium rounded-md px-4 py-2 transition-all duration-200"
            data-testid="add-menu-item-button"
          >
            <PlusCircleIcon className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>

        <MenuTable menuItems={menuItems || []} onEdit={handleEdit} onDelete={handleDelete} />

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px] p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-[#36454F]">
                {editingItem ? 'Edit Menu Item' : 'Create New Menu Item'}
              </DialogTitle>
            </DialogHeader>
            <MenuItemForm
              initialData={editingItem}
              onSave={handleSaveMenuItem}
              onCancel={handleCloseForm}
              isLoading={createMutation.isPending || updateMutation.isPending}
            />
          </DialogContent>
        </Dialog>

        <DeleteMenuItemDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          itemToDelete={itemToDelete}
          isLoading={deleteMutation.isPending}
        />
      </div>
    </AdminLayout>
  );
}