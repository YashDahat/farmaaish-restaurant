package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.TestimonialDto;
import com.farmaaishrestaurant.service.TestimonialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ResponseEntity<List<TestimonialDto>> getAllVisibleTestimonials() {
        List<TestimonialDto> testimonials = testimonialService.getAllVisibleTestimonials();
        return ResponseEntity.ok(testimonials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonialDto> getTestimonialById(@PathVariable UUID id) {
        TestimonialDto testimonial = testimonialService.getTestimonialById(id);
        return ResponseEntity.ok(testimonial);
    }
}