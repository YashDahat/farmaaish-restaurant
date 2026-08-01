package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CateringInquiryDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.InquiryStatus;
import com.farmaaishrestaurant.service.CateringInquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/catering-inquiries")
public class AdminCateringInquiryController {

    private final CateringInquiryService cateringInquiryService;

    @Autowired
    public AdminCateringInquiryController(CateringInquiryService cateringInquiryService) {
        this.cateringInquiryService = cateringInquiryService;
    }

    @GetMapping
    public ResponseEntity<List<CateringInquiryDto>> getAllCateringInquiries() {
        List<CateringInquiryDto> inquiries = cateringInquiryService.getAllInquiries();
        return ResponseEntity.ok(inquiries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CateringInquiryDto> getCateringInquiryById(@PathVariable UUID id) {
        try {
            CateringInquiryDto inquiry = cateringInquiryService.getInquiryById(id);
            return ResponseEntity.ok(inquiry);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<CateringInquiryDto>> getCateringInquiriesByStatus(@PathVariable InquiryStatus status) {
        List<CateringInquiryDto> inquiries = cateringInquiryService.getInquiriesByStatus(status);
        return ResponseEntity.ok(inquiries);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<CateringInquiryDto> updateCateringInquiryStatus(
            @PathVariable UUID id,
            @RequestParam InquiryStatus newStatus) {
        try {
            CateringInquiryDto updatedInquiry = cateringInquiryService.updateInquiryStatus(id, newStatus);
            return ResponseEntity.ok(updatedInquiry);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCateringInquiry(@PathVariable UUID id) {
        try {
            cateringInquiryService.deleteInquiry(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}