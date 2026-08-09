package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.SpecialOfferDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.SpecialOffer;
import com.farmaaishrestaurant.repository.SpecialOfferRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SpecialOfferService {

    private final SpecialOfferRepository specialOfferRepository;

    public SpecialOfferService(SpecialOfferRepository specialOfferRepository) {
        this.specialOfferRepository = specialOfferRepository;
    }

    public SpecialOfferDto createSpecialOffer(SpecialOfferDto offerDto) {
        validateSpecialOfferDto(offerDto);

        SpecialOffer specialOffer = new SpecialOffer();
        specialOffer.setTitle(offerDto.getTitle());
        specialOffer.setDescription(offerDto.getDescription());
        specialOffer.setDiscountPercentage(offerDto.getDiscountPercentage());
        specialOffer.setStartDate(offerDto.getStartDate());
        specialOffer.setEndDate(offerDto.getEndDate());
        specialOffer.setImageUrl(offerDto.getImageUrl());
        specialOffer.setActive(offerDto.getIsActive() != null ? offerDto.getIsActive() : false);

        SpecialOffer savedOffer = specialOfferRepository.save(specialOffer);
        return convertToDto(savedOffer);
    }

    public SpecialOfferDto getSpecialOfferById(UUID id) {
        SpecialOffer specialOffer = specialOfferRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Special offer not found with ID: " + id));
        return convertToDto(specialOffer);
    }

    public List<SpecialOfferDto> getAllActiveSpecialOffers() {
        List<SpecialOffer> activeOffers = specialOfferRepository.findByIsActiveTrueAndEndDateAfter(LocalDate.now());
        return activeOffers.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<SpecialOfferDto> getAllSpecialOffers() {
        List<SpecialOffer> allOffers = specialOfferRepository.findAll();
        return allOffers.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public SpecialOfferDto updateSpecialOffer(UUID id, SpecialOfferDto offerDto) {
        SpecialOffer existingOffer = specialOfferRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Special offer not found with ID: " + id));

        validateSpecialOfferDto(offerDto);

        existingOffer.setTitle(offerDto.getTitle());
        existingOffer.setDescription(offerDto.getDescription());
        existingOffer.setDiscountPercentage(offerDto.getDiscountPercentage());
        existingOffer.setStartDate(offerDto.getStartDate());
        existingOffer.setEndDate(offerDto.getEndDate());
        existingOffer.setImageUrl(offerDto.getImageUrl());
        existingOffer.setActive(offerDto.getIsActive() != null ? offerDto.getIsActive() : false);

        SpecialOffer updatedOffer = specialOfferRepository.save(existingOffer);
        return convertToDto(updatedOffer);
    }

    public void deleteSpecialOffer(UUID id) {
        if (!specialOfferRepository.existsById(id)) {
            throw new ResourceNotFoundException("Special offer not found with ID: " + id);
        }
        specialOfferRepository.deleteById(id);
    }

    private void validateSpecialOfferDto(SpecialOfferDto offerDto) {
        if (offerDto.getTitle() == null || offerDto.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Special offer title cannot be null or empty.");
        }
        if (offerDto.getStartDate() != null && offerDto.getEndDate() != null && offerDto.getStartDate().isAfter(offerDto.getEndDate())) {
            throw new IllegalArgumentException("Start date cannot be after end date.");
        }
    }

    private SpecialOfferDto convertToDto(SpecialOffer specialOffer) {
        return SpecialOfferDto.builder()
                .id(specialOffer.getId())
                .title(specialOffer.getTitle())
                .description(specialOffer.getDescription())
                .discountPercentage(specialOffer.getDiscountPercentage())
                .startDate(specialOffer.getStartDate())
                .endDate(specialOffer.getEndDate())
                .imageUrl(specialOffer.getImageUrl())
                .isActive(specialOffer.isActive())
                .build();
    }
}