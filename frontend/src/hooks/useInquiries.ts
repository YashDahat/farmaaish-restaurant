import { useMutation } from '@tanstack/react-query';
import { submitCateringInquiry } from '@/services/inquiryService';
import type { CateringInquiryDto } from '@/types/inquiry';

export const useSubmitInquiry = () => {
  return useMutation({
    mutationFn: (inquiryData: CateringInquiryDto) => submitCateringInquiry(inquiryData),
  });
};