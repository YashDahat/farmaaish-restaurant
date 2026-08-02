package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.InquiryDto;
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
    public ResponseEntity<InquiryDto> createInquiry(@Valid @RequestBody InquiryDto inquiryDto) {
        InquiryDto createdInquiry = inquiryService.createInquiry(inquiryDto);
        return new ResponseEntity<>(createdInquiry, HttpStatus.CREATED);
    }
}