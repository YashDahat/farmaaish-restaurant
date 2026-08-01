import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMenuItem } from '@/services/menuService';
import { toast } from 'sonner';

interface DeleteMenuItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  menuItemId: string | null;
  menuItemName: string | null;
}

export const DeleteMenuItemDialog = ({
  isOpen,
  onClose,
  menuItemId,
  menuItemName,
}: DeleteMenuItemDialogProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      toast.success('Menu item deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to delete menu item: ${error.message}`);
    },
  });

  const handleConfirmDelete = () => {
    if (menuItemId) {
      deleteMutation.mutate(menuItemId);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the menu item{' '}
            <span className="font-semibold">{menuItemName}</span> from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} data-testid="delete-menu-item-cancel">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            disabled={deleteMutation.isPending}
            className="bg-[#800020] hover:bg-[#66001a] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200"
            data-testid="delete-menu-item-confirm"
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};