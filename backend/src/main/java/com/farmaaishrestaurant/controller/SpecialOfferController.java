package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.SpecialOfferDto;
import com.farmaaishrestaurant.service.SpecialOfferService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/public/offers")
public class SpecialOfferController {

    private final SpecialOfferService specialOfferService;

    public SpecialOfferController(SpecialOfferService specialOfferService) {
        this.specialOfferService = specialOfferService;
    }

    @GetMapping("/active")
    public ResponseEntity<List<SpecialOfferDto>> getAllActiveSpecialOffers() {
        List<SpecialOfferDto> activeOffers = specialOfferService.getAllActiveSpecialOffers();
        return ResponseEntity.ok(activeOffers);
    }
}