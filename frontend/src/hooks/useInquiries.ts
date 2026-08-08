import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { createInquiry, getAllInquiries, getInquiryById, updateInquiryStatus } from '@/services/inquiryService';
import type { CreateEventInquiryRequest, EventInquiryResponse } from '@/types/inquiry';
import { ROUTES } from '@/routes';

export function useSubmitInquiry(): {
  mutate: (request: CreateEventInquiryRequest) => void;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation<
    EventInquiryResponse,
    Error,
    CreateEventInquiryRequest
  >({
    mutationFn: createInquiry,
    onSuccess: () => {
      toast.success('Inquiry submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      navigate(ROUTES.HOME);
    },
    onError: (err) => {
      toast.error(`Failed to submit inquiry: ${err.message}`);
    },
  });

  return { mutate, isPending, isError, error };
}

export function useAllInquiries(): {
  data: EventInquiryResponse[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isError, error } = useQuery<EventInquiryResponse[], Error>({
    queryKey: ['inquiries'],
    queryFn: getAllInquiries,
  });

  return { data, isLoading, isError, error };
}

export function useInquiry(inquiryId: string): {
  data: EventInquiryResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isError, error } = useQuery<EventInquiryResponse, Error>({
    queryKey: ['inquiries', inquiryId],
    queryFn: () => getInquiryById(inquiryId),
    enabled: !!inquiryId,
  });

  return { data, isLoading, isError, error };
}

export function useUpdateInquiryStatus(): {
  mutate: (inquiryId: string) => void;
  isPending: boolean;
  isError: boolean;
  error: Error | null;
} {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation<
    EventInquiryResponse,
    Error,
    string
  >({
    mutationFn: updateInquiryStatus,
    onSuccess: (updatedInquiry) => {
      toast.success(`Inquiry ${updatedInquiry.id} status updated successfully!`);
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['inquiries', updatedInquiry.id] });
    },
    onError: (err) => {
      toast.error(`Failed to update inquiry status: ${err.message}`);
    },
  });

  return { mutate, isPending, isError, error };
}