package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CateringInquiryDto;
import com.farmaaishrestaurant.dto.CreateInquiryRequest;
import com.farmaaishrestaurant.service.CateringInquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/catering-inquiries")
public class CateringInquiryController {

    private final CateringInquiryService cateringInquiryService;

    public CateringInquiryController(CateringInquiryService cateringInquiryService) {
        this.cateringInquiryService = cateringInquiryService;
    }

    @PostMapping
    public ResponseEntity<CateringInquiryDto> createInquiry(@Valid @RequestBody CreateInquiryRequest request) {
        CateringInquiryDto createdInquiry = cateringInquiryService.createInquiry(request);
        return new ResponseEntity<>(createdInquiry, HttpStatus.CREATED);
    }
}