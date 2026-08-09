package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CateringInquiryDto;
import com.farmaaishrestaurant.dto.CreateInquiryRequest;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.CateringInquiry;
import com.farmaaishrestaurant.model.InquiryStatus;
import com.farmaaishrestaurant.repository.CateringInquiryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CateringInquiryService {

    private final CateringInquiryRepository cateringInquiryRepository;

    public CateringInquiryService(CateringInquiryRepository cateringInquiryRepository) {
        this.cateringInquiryRepository = cateringInquiryRepository;
    }

    public CateringInquiryDto createInquiry(CreateInquiryRequest request) {
        if (request.getCustomerName() == null || request.getCustomerName().isEmpty() ||
            request.getCustomerEmail() == null || request.getCustomerEmail().isEmpty() ||
            request.getCustomerPhone() == null || request.getCustomerPhone().isEmpty() ||
            request.getEventType() == null || request.getEventType().isEmpty() ||
            request.getEventDate() == null ||
            request.getNumberOfGuests() == null) {
            throw new IllegalArgumentException("Required fields cannot be null or empty.");
        }

        CateringInquiry inquiry = new CateringInquiry();
        inquiry.setCustomerName(request.getCustomerName());
        inquiry.setCustomerEmail(request.getCustomerEmail());
        inquiry.setCustomerPhone(request.getCustomerPhone());
        inquiry.setEventType(request.getEventType());
        inquiry.setEventDate(request.getEventDate().atStartOfDay()); // Convert LocalDate to LocalDateTime
        inquiry.setEventLocation("Not specified"); // Assuming eventLocation is not in CreateInquiryRequest
        inquiry.setNumberOfGuests(request.getNumberOfGuests());
        inquiry.setSpecialRequests(request.getSpecialRequests());
        inquiry.setStatus(InquiryStatus.NEW);
        inquiry.setCreatedAt(LocalDateTime.now());
        inquiry.setUpdatedAt(LocalDateTime.now());

        CateringInquiry savedInquiry = cateringInquiryRepository.save(inquiry);
        return mapToDto(savedInquiry);
    }

    public List<CateringInquiryDto> getAllInquiries() {
        return cateringInquiryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public CateringInquiryDto getInquiryById(UUID id) {
        CateringInquiry inquiry = cateringInquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Catering inquiry not found with ID: " + id));
        return mapToDto(inquiry);
    }

    public CateringInquiryDto updateInquiryStatus(UUID id, InquiryStatus status) {
        CateringInquiry inquiry = cateringInquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Catering inquiry not found with ID: " + id));

        inquiry.setStatus(status);
        inquiry.setUpdatedAt(LocalDateTime.now());

        CateringInquiry updatedInquiry = cateringInquiryRepository.save(inquiry);
        return mapToDto(updatedInquiry);
    }

    private CateringInquiryDto mapToDto(CateringInquiry inquiry) {
        return CateringInquiryDto.builder()
                .id(inquiry.getId())
                .customerName(inquiry.getCustomerName())
                .customerEmail(inquiry.getCustomerEmail())
                .customerPhone(inquiry.getCustomerPhone())
                .eventType(inquiry.getEventType())
                .eventDate(inquiry.getEventDate().toLocalDate()) // Convert LocalDateTime back to LocalDate
                .numberOfGuests(inquiry.getNumberOfGuests())
                .specialRequests(inquiry.getSpecialRequests())
                .status(inquiry.getStatus())
                .createdAt(inquiry.getCreatedAt())
                .updatedAt(inquiry.getUpdatedAt())
                .build();
    }
}