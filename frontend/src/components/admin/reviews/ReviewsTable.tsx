import { deleteReview } from '@/services/apiService';
'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
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
import { useReviews } from '@/hooks/useReviews';
import { updateReview } from '@/services/reviewService';
import type { ReviewDto } from '@/types/review';

export default function ReviewsTable(): React.JSX.Element {
  const { reviews, isLoading, isError, error } = useReviews();
  const queryClient = useQueryClient();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allReviews'] });
      toast.success('Review deleted successfully.');
      setIsDeleteDialogOpen(false);
    },
    onError: (err) => {
      toast.error(`Failed to delete review: ${err.message}`);
    },
  });

  const updateMutation = useMutation<ReviewDto, Error, { id: string; review: ReviewDto }>({
    mutationFn: ({ id, review }) => updateReview(id, review),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allReviews'] });
      toast.success('Review updated successfully.');
    },
    onError: (err) => {
      toast.error(`Failed to update review: ${err.message}`);
    },
  });

  const handleDeleteClick = (reviewId: string): void => {
    setReviewToDelete(reviewId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = (): void => {
    if (reviewToDelete) {
      deleteMutation.mutate(reviewToDelete);
    }
  };

  const handleToggleFeatured = (review: ReviewDto): void => {
    updateMutation.mutate({
      id: review.id,
      review: { ...review, isFeatured: !review.isFeatured },
    });
  };

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table data-testid="reviews-table">
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews?.map((review) => (
            <TableRow key={review.id} data-testid={`review-row-${review.id}`}>
              <TableCell>{review.authorName}</TableCell>
              <TableCell>{review.rating}</TableCell>
              <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
              <TableCell>{review.source}</TableCell>
              <TableCell>{new Date(review.reviewDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Switch
                  checked={review.isFeatured}
                  onCheckedChange={() => handleToggleFeatured(review)}
                  data-testid={`review-featured-switch-${review.id}`}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteClick(review.id)}
                  data-testid={`review-delete-button-${review.id}`}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the review.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="delete-review-cancel">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              data-testid="delete-review-confirm"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}