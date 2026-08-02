import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { MenuItemDto } from '@/types/menu';
import { deleteMenuItem } from '@/services/apiService';
import { useMenu } from '@/hooks/useMenu';
import MenuItemForm from './MenuItemForm';
import DeleteMenuItemDialog from './DeleteMenuItemDialog';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { PencilIcon, Trash2Icon } from 'lucide-react';

export default function MenuTable() {
  const { menuItems, menuCategories, activeCategory, setActiveCategory, isLoading, isError, error } = useMenu();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemDto | null>(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      toast.success('Menu item deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      setIsDeleteDialogOpen(false);
    },
    onError: (err) => {
      toast.error(`Failed to delete menu item: ${err.message}`);
    },
  });

  const handleEdit = (item: MenuItemDto) => {
    setSelectedMenuItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = (item: MenuItemDto) => {
    setSelectedMenuItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedMenuItem?.id) {
      deleteMutation.mutate(selectedMenuItem.id);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error loading menu items: {error?.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select onValueChange={setActiveCategory} value={activeCategory}>
          <SelectTrigger className="w-[180px]" data-testid="menu-category-select">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {menuCategories.map((category) => (
              <SelectItem key={category.id} value={category.name ?? ''}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button data-testid="add-menu-item-cta" onClick={() => {
              setSelectedMenuItem(null);
              setIsFormOpen(true);
            }}>Add New Item</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <MenuItemForm
              initialData={selectedMenuItem ?? undefined}
              onSuccess={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Table data-testid="menu-items-table">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Vegetarian</TableHead>
            <TableHead>Spicy</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">No menu items found.</TableCell>
            </TableRow>
          ) : (
            menuItems.map((item) => (
              <TableRow key={item.id} data-testid={`menu-item-row-${item.id}`}>
                <TableCell>
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.name ?? ''} className="w-16 h-16 object-cover rounded-md" />
                  )}
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.categoryName}</TableCell>
                <TableCell>
                  {item.price?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </TableCell>
                <TableCell>{item.vegetarian ? 'Yes' : 'No'}</TableCell>
                <TableCell>{item.spicy ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item)}
                    className="mr-2"
                    data-testid={`edit-menu-item-${item.id}`}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item)}
                    data-testid={`delete-menu-item-${item.id}`}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <DeleteMenuItemDialog
        menuItemId={selectedMenuItem?.id ?? ''}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
}