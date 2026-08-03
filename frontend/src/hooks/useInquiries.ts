import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteInquiry, getAllInquiries, getInquiryById, submitInquiry } from '@/services/inquiryService';
import type { CateringInquiryDto } from '@/types/inquiry';

export function useSubmitCateringInquiry(): {
  mutate: (request: CateringInquiryDto) => void;
  isPending: boolean;
  isSuccess: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation<CateringInquiryDto, Error, CateringInquiryDto>({
    mutationFn: submitInquiry,
    onSuccess: () => {
      toast.success('Catering inquiry submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['cateringInquiries'] });
    },
    onError: (err) => {
      toast.error(`Failed to submit inquiry: ${err.message}`);
    },
  });
  return { mutate, isPending, isSuccess, error };
}

export function useAllCateringInquiries(): {
  data: CateringInquiryDto[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isError, error } = useQuery<CateringInquiryDto[], Error>({
    queryKey: ['cateringInquiries'],
    queryFn: getAllInquiries,
  });
  return { data, isLoading, isError, error };
}

export function useCateringInquiryById(id: number): {
  data: CateringInquiryDto | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isError, error } = useQuery<CateringInquiryDto, Error>({
    queryKey: ['cateringInquiry', id],
    queryFn: () => getInquiryById(id),
    enabled: !!id,
  });
  return { data, isLoading, isError, error };
}

export function useDeleteCateringInquiry(): {
  mutate: (id: number) => void;
  isPending: boolean;
  isSuccess: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess, error } = useMutation<void, Error, number>({
    mutationFn: deleteInquiry,
    onSuccess: () => {
      toast.success('Catering inquiry deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['cateringInquiries'] });
    },
    onError: (err) => {
      toast.error(`Failed to delete inquiry: ${err.message}`);
    },
  });
  return { mutate, isPending, isSuccess, error };
}