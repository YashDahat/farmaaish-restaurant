import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import {
  useCreateMenuItem,
  useDeleteMenuItem,
  useMenuItemCategories,
  useMenuItems,
  useUpdateMenuItem,
} from '@/hooks/useMenu';
import MenuTable from '@/components/menu/MenuTable';
import MenuItemFormDialog from '@/components/menu/MenuItemFormDialog';
import { MenuItemDto } from '@/types/menu';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminMenuPage(): JSX.Element {
  const { data: menuItems, isLoading: isLoadingMenuItems, isError: isErrorMenuItems, error: menuItemsError } = useMenuItems();
  const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories, error: categoriesError } = useMenuItemCategories();

  const createMenuItemMutation = useCreateMenuItem();
  const updateMenuItemMutation = useUpdateMenuItem();
  const deleteMenuItemMutation = useDeleteMenuItem();

  const [isFormDialogOpen, setIsFormDialogOpen] = useState<boolean>(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItemDto | undefined>(undefined);

  const handleAddMenuItem = (): void => {
    setEditingMenuItem(undefined);
    setIsFormDialogOpen(true);
  };

  const handleEditMenuItem = (item: MenuItemDto): void => {
    setEditingMenuItem(item);
    setIsFormDialogOpen(true);
  };

  const handleDeleteMenuItem = (id: number): void => {
    deleteMenuItemMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Menu item deleted successfully.');
      },
      onError: (error) => {
        toast.error(`Failed to delete menu item: ${error.message}`);
      },
    });
  };

  const handleSubmitMenuItem = (item: MenuItemDto): void => {
    if (editingMenuItem) {
      updateMenuItemMutation.mutate(
        { id: editingMenuItem.id, request: item },
        {
          onSuccess: () => {
            toast.success('Menu item updated successfully.');
          },
          onError: (error) => {
            toast.error(`Failed to update menu item: ${error.message}`);
          },
        }
      );
    } else {
      createMenuItemMutation.mutate(item, {
        onSuccess: () => {
          toast.success('Menu item added successfully.');
        },
        onError: (error) => {
          toast.error(`Failed to add menu item: ${error.message}`);
        },
      });
    }
  };

  if (isLoadingMenuItems || isLoadingCategories) {
    return (
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </AdminLayout>
    );
  }

  if (isErrorMenuItems) {
    return (
      <AdminLayout>
        <div className="text-red-500">Error loading menu items: {menuItemsError?.message}</div>
      </AdminLayout>
    );
  }

  if (isErrorCategories) {
    return (
      <AdminLayout>
        <div className="text-red-500">Error loading categories: {categoriesError?.message}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <Button data-testid="add-menu-item-button" onClick={handleAddMenuItem}>Add New Item</Button>
      </div>

      {menuItems && categories && (
        <>
          <MenuTable
            menuItems={menuItems}
            onEditMenuItem={handleEditMenuItem}
            onDeleteMenuItem={handleDeleteMenuItem}
          />
          <MenuItemFormDialog
            isOpen={isFormDialogOpen}
            onClose={() => setIsFormDialogOpen(false)}
            initialData={editingMenuItem}
            categories={categories}
            onSubmit={handleSubmitMenuItem}
          />
        </>
      )}
    </AdminLayout>
  );
}