package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.TestimonialDto;
import com.farmaaishrestaurant.service.TestimonialService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/testimonials")
public class AdminTestimonialController {

    private final TestimonialService testimonialService;

    public AdminTestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ResponseEntity<List<TestimonialDto>> getAllTestimonials() {
        List<TestimonialDto> testimonials = testimonialService.getAllTestimonials();
        return ResponseEntity.ok(testimonials);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonialDto> getTestimonialById(@PathVariable UUID id) {
        TestimonialDto testimonial = testimonialService.getTestimonialById(id);
        return ResponseEntity.ok(testimonial);
    }

    @PostMapping
    public ResponseEntity<TestimonialDto> createTestimonial(@RequestBody TestimonialDto testimonialDto) {
        TestimonialDto createdTestimonial = testimonialService.createTestimonial(testimonialDto);
        return new ResponseEntity<>(createdTestimonial, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestimonialDto> updateTestimonial(@PathVariable UUID id, @RequestBody TestimonialDto testimonialDto) {
        TestimonialDto updatedTestimonial = testimonialService.updateTestimonial(id, testimonialDto);
        return ResponseEntity.ok(updatedTestimonial);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestimonial(@PathVariable UUID id) {
        testimonialService.deleteTestimonial(id);
        return ResponseEntity.noContent().build();
    }
}