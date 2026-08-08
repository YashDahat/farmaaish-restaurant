package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.EventInquiryResponse;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.InquiryStatus;
import com.farmaaishrestaurant.service.EventInquiryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/inquiries")
public class AdminEventInquiryController {

    private final EventInquiryService eventInquiryService;

    public AdminEventInquiryController(EventInquiryService eventInquiryService) {
        this.eventInquiryService = eventInquiryService;
    }

    @GetMapping
    public ResponseEntity<List<EventInquiryResponse>> getAllInquiries() {
        List<EventInquiryResponse> inquiries = eventInquiryService.getAllInquiries();
        return ResponseEntity.ok(inquiries);
    }

    @GetMapping("/{inquiryId}")
    public ResponseEntity<EventInquiryResponse> getInquiryById(@PathVariable UUID inquiryId) {
        try {
            EventInquiryResponse inquiry = eventInquiryService.getInquiryById(inquiryId);
            return ResponseEntity.ok(inquiry);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{inquiryId}/status")
    public ResponseEntity<EventInquiryResponse> updateInquiryStatus(
            @PathVariable UUID inquiryId,
            @RequestParam InquiryStatus newStatus) {
        try {
            EventInquiryResponse updatedInquiry = eventInquiryService.updateInquiryStatus(inquiryId, newStatus);
            return ResponseEntity.ok(updatedInquiry);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}