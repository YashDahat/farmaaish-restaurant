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
import type { MenuItemDto } from '@/types/menu';

interface DeleteMenuItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
  itemToDelete: MenuItemDto | null;
  isLoading: boolean;
}

export function DeleteMenuItemDialog({
  isOpen,
  onClose,
  onConfirm,
  itemToDelete,
  isLoading,
}: DeleteMenuItemDialogProps): JSX.Element {
  const handleDelete = (): void => {
    if (itemToDelete) {
      onConfirm(itemToDelete.id);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the menu item{' '}
            <span className="font-semibold">{itemToDelete?.name ?? 'N/A'}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose} disabled={isLoading}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-[#800020] hover:bg-[#6A001A] text-white font-medium rounded-md px-4 py-2"
            data-testid="delete-menu-item-confirm"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}