package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CateringInquiryDto;
import com.farmaaishrestaurant.service.CateringInquiryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/catering-inquiries")
public class CateringInquiryController {

    private final CateringInquiryService cateringInquiryService;

    @Autowired
    public CateringInquiryController(CateringInquiryService cateringInquiryService) {
        this.cateringInquiryService = cateringInquiryService;
    }

    @PostMapping
    public ResponseEntity<CateringInquiryDto> submitCateringInquiry(@RequestBody CateringInquiryDto inquiryDto) {
        try {
            CateringInquiryDto createdInquiry = cateringInquiryService.submitInquiry(inquiryDto);
            return new ResponseEntity<>(createdInquiry, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}