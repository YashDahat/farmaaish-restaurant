package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CreateInquiryRequest;
import com.farmaaishrestaurant.dto.InquiryResponse;
import com.farmaaishrestaurant.service.InquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/inquiries")
public class InquiryController {

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping
    public ResponseEntity<InquiryResponse> submitInquiry(@Valid @RequestBody CreateInquiryRequest request) {
        InquiryResponse response = inquiryService.createInquiry(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}