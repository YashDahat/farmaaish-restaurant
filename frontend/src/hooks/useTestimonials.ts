import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getAllVisibleTestimonials } from '@/services/testimonialService';
import type { TestimonialDto } from '@/types/testimonial';

export const useAllVisibleTestimonials = (): UseQueryResult<TestimonialDto[], Error> => {
  return useQuery<TestimonialDto[], Error>({
    queryKey: ['testimonials', 'visible'],
    queryFn: getAllVisibleTestimonials,
  });
};