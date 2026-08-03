package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CateringInquiryDto;
import com.farmaaishrestaurant.service.CateringInquiryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/inquiries/catering")
public class CateringInquiryController {

    private final CateringInquiryService cateringInquiryService;

    public CateringInquiryController(CateringInquiryService cateringInquiryService) {
        this.cateringInquiryService = cateringInquiryService;
    }

    @PostMapping
    public ResponseEntity<CateringInquiryDto> submitInquiry(@RequestBody CateringInquiryDto inquiryDto) {
        try {
            CateringInquiryDto savedInquiry = cateringInquiryService.submitInquiry(inquiryDto);
            return new ResponseEntity<>(savedInquiry, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}