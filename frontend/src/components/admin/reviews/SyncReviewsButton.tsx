import type { JSX } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { syncReviews } from '@/services/apiService';

export function SyncReviewsButton(): React.JSX.Element {
  const queryClient = useQueryClient();

  const { mutate: syncReviewsMutation, isPending } = useMutation<unknown, Error>({
    mutationFn: syncReviews,
    onSuccess: () => {
      toast.success('Reviews synchronized successfully!');
      queryClient.invalidateQueries({ queryKey: ['allReviews'] });
      queryClient.invalidateQueries({ queryKey: ['featuredReviews'] });
    },
    onError: (error) => {
      toast.error(`Failed to sync reviews: ${error.message}`);
    },
  });

  const handleSyncReviews = (): void => {
    syncReviewsMutation();
  };

  return (
    <Button
      onClick={handleSyncReviews}
      disabled={isPending}
      data-testid="sync-reviews-button"
    >
      {isPending ? 'Syncing...' : 'Sync Reviews'}
    </Button>
  );
}