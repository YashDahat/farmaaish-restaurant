import { useQuery } from '@tanstack/react-query';
import { getAllActiveSpecialOffers } from '@/services/offerService';
import type { SpecialOfferDto } from '@/types/offer';

export function useOffers(): {
  offers: SpecialOfferDto[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isError, error } = useQuery<SpecialOfferDto[], Error>({
    queryKey: ['activeOffers'],
    queryFn: getAllActiveSpecialOffers,
  });

  return { offers: data, isLoading, isError, error };
}