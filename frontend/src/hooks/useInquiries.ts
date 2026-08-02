import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createInquiry,
  deleteInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
} from '@/services/inquiryService';
import { InquiryDto } from '@/types/inquiry';

export const useInquiries = () => {
  const queryClient = useQueryClient();

  const {
    data: inquiries,
    isLoading: isLoadingInquiries,
    isError: isErrorInquiries,
    error: inquiriesError,
  } = useQuery<InquiryDto[]>({
    queryKey: ['inquiries'],
    queryFn: getAllInquiries,
  });

  const createInquiryMutation = useMutation({
    mutationFn: createInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });

  const updateInquiryStatusMutation = useMutation({
    mutationFn: updateInquiryStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['inquiry'] });
    },
  });

  const deleteInquiryMutation = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });

  const getInquiry = (id: string) => {
    return useQuery<InquiryDto>({
      queryKey: ['inquiry', id],
      queryFn: () => getInquiryById(id),
      enabled: !!id,
    });
  };

  return {
    inquiries,
    isLoadingInquiries,
    isErrorInquiries,
    inquiriesError,
    createInquiry: createInquiryMutation.mutate,
    isCreatingInquiry: createInquiryMutation.isPending,
    createInquiryError: createInquiryMutation.error,
    updateInquiryStatus: updateInquiryStatusMutation.mutate,
    isUpdatingInquiryStatus: updateInquiryStatusMutation.isPending,
    updateInquiryStatusError: updateInquiryStatusMutation.error,
    deleteInquiry: deleteInquiryMutation.mutate,
    isDeletingInquiry: deleteInquiryMutation.isPending,
    deleteInquiryError: deleteInquiryMutation.error,
    getInquiry,
  };
};