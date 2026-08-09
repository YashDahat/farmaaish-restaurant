import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AdminLayout from '@/components/AdminLayout';
import MenuTable from '@/components/admin/menu/MenuTable';
import MenuItemForm from '@/components/admin/menu/MenuItemForm';
import { MenuItemDto } from '@/types/menu';

export default function AdminMenuPage() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItemDto | undefined>(undefined);

  const handleEditMenuItem = (item: MenuItemDto): void => {
    setEditingMenuItem(item);
    setIsFormOpen(true);
  };

  const handleFormSuccess = (): void => {
    setIsFormOpen(false);
    setEditingMenuItem(undefined);
  };

  const handleCreateNew = (): void => {
    setEditingMenuItem(undefined);
    setIsFormOpen(true);
  };

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Menu Management</h1>
            <Button onClick={handleCreateNew} data-testid="create-menu-item-button">
              Add New Menu Item
            </Button>
          </div>

          <MenuTable onEditMenuItem={handleEditMenuItem} />

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingMenuItem ? 'Edit Menu Item' : 'Create New Menu Item'}</DialogTitle>
              </DialogHeader>
              <MenuItemForm initialData={editingMenuItem} onSuccess={handleFormSuccess} />
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </AdminLayout>
  );
}