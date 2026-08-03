package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CateringInquiryDto;
import com.farmaaishrestaurant.service.CateringInquiryService;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/inquiries/catering")
public class AdminCateringInquiryController {

    private final CateringInquiryService cateringInquiryService;

    public AdminCateringInquiryController(CateringInquiryService cateringInquiryService) {
        this.cateringInquiryService = cateringInquiryService;
    }

    @GetMapping
    public ResponseEntity<List<CateringInquiryDto>> getAllInquiries() {
        List<CateringInquiryDto> inquiries = cateringInquiryService.getAllInquiries();
        return ResponseEntity.ok(inquiries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CateringInquiryDto> getInquiryById(@PathVariable Long id) {
        try {
            CateringInquiryDto inquiry = cateringInquiryService.getInquiryById(id);
            return ResponseEntity.ok(inquiry);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInquiry(@PathVariable Long id) {
        try {
            cateringInquiryService.deleteInquiry(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}