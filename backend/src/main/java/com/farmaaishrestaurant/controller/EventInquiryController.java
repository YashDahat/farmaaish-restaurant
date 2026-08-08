package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CreateEventInquiryRequest;
import com.farmaaishrestaurant.dto.EventInquiryResponse;
import com.farmaaishrestaurant.service.EventInquiryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public/inquiries")
public class EventInquiryController {

    private final EventInquiryService eventInquiryService;

    public EventInquiryController(EventInquiryService eventInquiryService) {
        this.eventInquiryService = eventInquiryService;
    }

    @PostMapping
    public ResponseEntity<EventInquiryResponse> createInquiry(@Valid @RequestBody CreateEventInquiryRequest request) {
        EventInquiryResponse response = eventInquiryService.createInquiry(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}