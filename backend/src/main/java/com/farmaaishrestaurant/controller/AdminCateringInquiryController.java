package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CateringInquiryDto;
import com.farmaaishrestaurant.model.InquiryStatus;
import com.farmaaishrestaurant.service.CateringInquiryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/catering-inquiries")
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
    public ResponseEntity<CateringInquiryDto> getInquiryById(@PathVariable UUID id) {
        CateringInquiryDto inquiry = cateringInquiryService.getInquiryById(id);
        return ResponseEntity.ok(inquiry);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<CateringInquiryDto> updateInquiryStatus(@PathVariable UUID id, @RequestParam InquiryStatus status) {
        CateringInquiryDto updatedInquiry = cateringInquiryService.updateInquiryStatus(id, status);
        return ResponseEntity.ok(updatedInquiry);
    }
}