package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.InquiryDto;
import com.farmaaishrestaurant.model.InquiryStatus;
import com.farmaaishrestaurant.service.InquiryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/admin/inquiries")
public class AdminInquiryController {

    private final InquiryService inquiryService;

    public AdminInquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @GetMapping
    public ResponseEntity<List<InquiryDto>> getAllInquiries() {
        List<InquiryDto> inquiries = inquiryService.getAllInquiries();
        return ResponseEntity.ok(inquiries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InquiryDto> getInquiryById(@PathVariable UUID id) {
        InquiryDto inquiry = inquiryService.getInquiryById(id);
        return ResponseEntity.ok(inquiry);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<InquiryDto> updateInquiryStatus(@PathVariable UUID id, @RequestParam InquiryStatus status) {
        InquiryDto updatedInquiry = inquiryService.updateInquiryStatus(id, status);
        return ResponseEntity.ok(updatedInquiry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInquiry(@PathVariable UUID id) {
        inquiryService.deleteInquiry(id);
        return ResponseEntity.noContent().build();
    }
}