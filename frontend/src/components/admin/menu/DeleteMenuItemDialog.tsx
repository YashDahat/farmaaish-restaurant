import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
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
import { Button } from '@/components/ui/button';
import { deleteMenuItem } from '@/services/apiService';

interface DeleteMenuItemDialogProps {
  itemId: string;
  itemName: string;
}

export default function DeleteMenuItemDialog({ itemId, itemName }: DeleteMenuItemDialogProps): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      toast.success(`Menu item "${itemName}" deleted successfully.`);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to delete menu item: ${error.message}`);
    },
  });

  const handleDelete = (): void => {
    deleteMutation.mutate(itemId);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" data-testid={`delete-menu-item-${itemId}`}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the menu item &quot;{itemName}&quot;.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending} data-testid="confirm-delete-menu-item">
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}