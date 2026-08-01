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
import { Button } from '@/components/ui/button';
import { deleteTestimonial } from '@/services/apiService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteTestimonialDialogProps {
  testimonialId: string;
  onClose: () => void;
  isOpen: boolean;
}

export const DeleteTestimonialDialog: React.FC<DeleteTestimonialDialogProps> = ({
  testimonialId,
  onClose,
  isOpen,
}) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      toast.success('Testimonial deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      onClose();
    },
    onError: (error) => {
      toast.error('Failed to delete testimonial.', {
        description: error.message,
      });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(testimonialId);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the testimonial.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onClose} data-testid="delete-testimonial-cancel-btn">
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              onClick={handleDelete}
              className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold"
              disabled={deleteMutation.isPending}
              data-testid="delete-testimonial-confirm-btn"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};