import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { submitInquiry } from '@/services/inquiryService';
import type { CreateInquiryRequest, InquiryResponse } from '@/types/inquiry';

export const useInquiry = () => {
  return useMutation<InquiryResponse, Error, CreateInquiryRequest>({
    mutationFn: submitInquiry,
    onSuccess: () => {
      toast.success('Inquiry submitted successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to submit inquiry: ${error.message}`);
    },
  });
};