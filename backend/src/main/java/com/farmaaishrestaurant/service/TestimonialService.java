package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.TestimonialDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Testimonial;
import com.farmaaishrestaurant.repository.TestimonialRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public TestimonialService(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    public List<TestimonialDto> getAllVisibleTestimonials() {
        return testimonialRepository.findByApprovedTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<TestimonialDto> getAllTestimonials() {
        return testimonialRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public TestimonialDto getTestimonialById(UUID id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));
        return convertToDto(testimonial);
    }

    public TestimonialDto createTestimonial(TestimonialDto testimonialDto) {
        Testimonial testimonial = convertToEntity(testimonialDto);
        testimonial.setCreatedAt(LocalDateTime.now());
        testimonial.setApproved(false); // New testimonials are not approved by default
        Testimonial savedTestimonial = testimonialRepository.save(testimonial);
        return convertToDto(savedTestimonial);
    }

    public TestimonialDto updateTestimonial(UUID id, TestimonialDto testimonialDto) {
        Testimonial existingTestimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Testimonial not found with id: " + id));

        existingTestimonial.setCustomerName(testimonialDto.getCustomerName());
        existingTestimonial.setReview(testimonialDto.getReviewText());
        existingTestimonial.setRating(testimonialDto.getRating());
        existingTestimonial.setApproved(testimonialDto.getIsVisible());

        Testimonial updatedTestimonial = testimonialRepository.save(existingTestimonial);
        return convertToDto(updatedTestimonial);
    }

    public void deleteTestimonial(UUID id) {
        if (!testimonialRepository.existsById(id)) {
            throw new ResourceNotFoundException("Testimonial not found with id: " + id);
        }
        testimonialRepository.deleteById(id);
    }

    private TestimonialDto convertToDto(Testimonial testimonial) {
        return TestimonialDto.builder()
                .id(testimonial.getId())
                .customerName(testimonial.getCustomerName())
                .reviewText(testimonial.getReview())
                .rating(testimonial.getRating())
                .isVisible(testimonial.getApproved())
                .createdAt(testimonial.getCreatedAt())
                .build();
    }

    private Testimonial convertToEntity(TestimonialDto testimonialDto) {
        Testimonial testimonial = new Testimonial();
        testimonial.setId(testimonialDto.getId());
        testimonial.setCustomerName(testimonialDto.getCustomerName());
        testimonial.setReview(testimonialDto.getReviewText());
        testimonial.setRating(testimonialDto.getRating());
        testimonial.setCreatedAt(testimonialDto.getCreatedAt());
        testimonial.setApproved(testimonialDto.getIsVisible());
        return testimonial;
    }
}