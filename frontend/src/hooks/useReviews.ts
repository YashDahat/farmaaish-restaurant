import { useQuery } from '@tanstack/react-query';
import { getFeaturedReviews } from '@/services/reviewService';
import type { ReviewDto } from '@/types/review';

export function useReviews(): {
  reviews: ReviewDto[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isError, error } = useQuery<ReviewDto[], Error>({
    queryKey: ['featuredReviews'],
    queryFn: getFeaturedReviews,
  });

  return {
    reviews: data,
    isLoading,
    isError,
    error,
  };
}