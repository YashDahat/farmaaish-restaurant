package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.InquiryResponse;
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
    public ResponseEntity<List<InquiryResponse>> getAllInquiries() {
        List<InquiryResponse> inquiries = inquiryService.getAllInquiries();
        return new ResponseEntity<>(inquiries, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InquiryResponse> getInquiryById(@PathVariable UUID id) {
        InquiryResponse inquiry = inquiryService.getInquiryById(id);
        return new ResponseEntity<>(inquiry, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<InquiryResponse> updateInquiryStatus(@PathVariable UUID id, @RequestBody UpdateInquiryStatusRequest request) {
        InquiryResponse updatedInquiry = inquiryService.updateInquiryStatus(id, request.getStatus());
        return new ResponseEntity<>(updatedInquiry, HttpStatus.OK);
    }
}