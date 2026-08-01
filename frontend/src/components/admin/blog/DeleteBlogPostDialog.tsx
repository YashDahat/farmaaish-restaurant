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
import { useDeleteBlogPost } from '@/hooks/useBlog';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface DeleteBlogPostDialogProps {
  blogPostId: string;
  onClose: () => void;
}

export function DeleteBlogPostDialog({ blogPostId, onClose }: DeleteBlogPostDialogProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteBlogPostMutation } = useDeleteBlogPost();

  const handleDelete = async () => {
    try {
      await deleteBlogPostMutation(blogPostId);
      toast.success('Blog post deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
      onClose();
    } catch (error) {
      toast.error('Failed to delete blog post.');
      console.error('Failed to delete blog post:', error);
    }
  };

  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the blog post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-[#D4AF37] hover:bg-[#b89a2f]">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}