import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  adminGetAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from '@/services/menuService';
import { MenuItemDto } from '@/types/menu';
import AdminLayout from '@/components/AdminLayout';
import { MenuTable } from '@/components/admin/menu/MenuTable';
import MenuItemForm from '@/components/admin/menu/MenuItemForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { PlusCircleIcon } from 'lucide-react';

const AdminMenuPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemDto | null>(
    null,
  );
  const [menuItemToDeleteId, setMenuItemToDeleteId] = useState<string | null>(
    null,
  );

  const {
    data: menuItems,
    isLoading,
    error,
  } = useQuery<MenuItemDto[], Error>({
    queryKey: ['adminMenuItems'],
    queryFn: adminGetAllMenuItems,
  });

  const createMutation = useMutation<MenuItemDto, Error, MenuItemDto>({
    mutationFn: createMenuItem,
    onSuccess: () => {
      toast.success('Menu item created successfully!');
      queryClient.invalidateQueries({ queryKey: ['adminMenuItems'] });
      setIsFormOpen(false);
    },
    onError: (err) => {
      toast.error(`Failed to create menu item: ${err.message}`);
    },
  });

  const updateMutation = useMutation<
    MenuItemDto,
    Error,
    { id: string; data: MenuItemDto }
  >({
    mutationFn: ({ id, data }) => updateMenuItem(id, data),
    onSuccess: () => {
      toast.success('Menu item updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['adminMenuItems'] });
      setIsFormOpen(false);
      setSelectedMenuItem(null);
    },
    onError: (err) => {
      toast.error(`Failed to update menu item: ${err.message}`);
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      toast.success('Menu item deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['adminMenuItems'] });
      setIsDeleteDialogOpen(false);
      setMenuItemToDeleteId(null);
    },
    onError: (err) => {
      toast.error(`Failed to delete menu item: ${err.message}`);
    },
  });

  const handleFormSubmit = (data: MenuItemDto) => {
    if (selectedMenuItem?.id) {
      updateMutation.mutate({ id: selectedMenuItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (item: MenuItemDto) => {
    setSelectedMenuItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setMenuItemToDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (menuItemToDeleteId) {
      deleteMutation.mutate(menuItemToDeleteId);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <p>Loading menu items...</p>
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <p>Error loading menu items: {error.message}</p>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#36454F]">Menu Management</h1>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200"
                  onClick={() => {
                    setSelectedMenuItem(null);
                    setIsFormOpen(true);
                  }}
                  data-testid="add-menu-item-button"
                >
                  <PlusCircleIcon className="mr-2 h-5 w-5" /> Add New Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>
                    {selectedMenuItem ? 'Edit Menu Item' : 'Create New Menu Item'}
                  </DialogTitle>
                </DialogHeader>
                <MenuItemForm
                  initialData={selectedMenuItem ?? undefined}
                  onSubmit={handleFormSubmit}
                />
              </DialogContent>
            </Dialog>
          </div>

          <MenuTable menuItems={menuItems ?? []} onEdit={handleEdit} onDelete={handleDelete} />

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  menu item from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="cancel-delete-menu-item">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  data-testid="confirm-delete-menu-item"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminMenuPage;