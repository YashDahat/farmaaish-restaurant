import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createInquiry } from '@/services/inquiryService';
import type { CateringInquiryDto, CreateInquiryRequest } from '@/types/inquiry';

export function useCreateInquiry(): {
  mutate: (request: CreateInquiryRequest) => void;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: CateringInquiryDto | undefined;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess, data, error } = useMutation<
    CateringInquiryDto,
    Error,
    CreateInquiryRequest
  >({
    mutationFn: createInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cateringInquiries'] });
    },
  });

  return { mutate, isPending, isError, isSuccess, data, error };
}