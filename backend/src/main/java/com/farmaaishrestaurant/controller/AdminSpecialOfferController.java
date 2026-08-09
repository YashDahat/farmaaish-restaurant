package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.SpecialOfferDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.service.SpecialOfferService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/special-offers")
public class AdminSpecialOfferController {

    private final SpecialOfferService specialOfferService;

    public AdminSpecialOfferController(SpecialOfferService specialOfferService) {
        this.specialOfferService = specialOfferService;
    }

    @PostMapping
    public ResponseEntity<SpecialOfferDto> createSpecialOffer(@RequestBody SpecialOfferDto offerDto) {
        try {
            SpecialOfferDto createdOffer = specialOfferService.createSpecialOffer(offerDto);
            return new ResponseEntity<>(createdOffer, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<SpecialOfferDto>> getAllSpecialOffers() {
        List<SpecialOfferDto> offers = specialOfferService.getAllSpecialOffers();
        return new ResponseEntity<>(offers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpecialOfferDto> getSpecialOfferById(@PathVariable UUID id) {
        try {
            SpecialOfferDto offer = specialOfferService.getSpecialOfferById(id);
            return new ResponseEntity<>(offer, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpecialOfferDto> updateSpecialOffer(@PathVariable UUID id, @RequestBody SpecialOfferDto offerDto) {
        try {
            SpecialOfferDto updatedOffer = specialOfferService.updateSpecialOffer(id, offerDto);
            return new ResponseEntity<>(updatedOffer, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpecialOffer(@PathVariable UUID id) {
        try {
            specialOfferService.deleteSpecialOffer(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}