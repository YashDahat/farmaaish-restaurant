package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CateringInquiryDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.CateringInquiry;
import com.farmaaishrestaurant.model.InquiryStatus;
import com.farmaaishrestaurant.repository.CateringInquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CateringInquiryService {

    private final CateringInquiryRepository cateringInquiryRepository;

    @Autowired
    public CateringInquiryService(CateringInquiryRepository cateringInquiryRepository) {
        this.cateringInquiryRepository = cateringInquiryRepository;
    }

    public CateringInquiryDto submitInquiry(CateringInquiryDto inquiryDto) {
        if (inquiryDto == null || inquiryDto.getCustomerName() == null || inquiryDto.getCustomerEmail() == null ||
                inquiryDto.getCustomerPhone() == null || inquiryDto.getEventType() == null ||
                inquiryDto.getEventDate() == null || inquiryDto.getNumberOfGuests() == null) {
            throw new IllegalArgumentException("Invalid inquiry data provided.");
        }

        CateringInquiry inquiry = new CateringInquiry();
        inquiry.setCustomerName(inquiryDto.getCustomerName());
        inquiry.setCustomerEmail(inquiryDto.getCustomerEmail());
        inquiry.setCustomerPhone(inquiryDto.getCustomerPhone());
        inquiry.setEventType(inquiryDto.getEventType());
        inquiry.setEventDate(inquiryDto.getEventDate().atStartOfDay()); // Convert LocalDate to LocalDateTime
        inquiry.setNumberOfGuests(inquiryDto.getNumberOfGuests());
        inquiry.setBudget(inquiryDto.getBudget() != null ? inquiryDto.getBudget().doubleValue() : null);
        inquiry.setMessage(inquiryDto.getMessage());
        inquiry.setInquiryStatus(InquiryStatus.NEW); // Set initial status
        // createdAt and updatedAt are handled by @PrePersist

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
                .orElseThrow(() -> new ResourceNotFoundException("Catering inquiry not found with id: " + id));
        return mapToDto(inquiry);
    }

    public List<CateringInquiryDto> getInquiriesByStatus(InquiryStatus status) {
        return cateringInquiryRepository.findByInquiryStatus(status).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public CateringInquiryDto updateInquiryStatus(UUID id, InquiryStatus newStatus) {
        if (newStatus == null) {
            throw new IllegalArgumentException("New status cannot be null.");
        }

        CateringInquiry inquiry = cateringInquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Catering inquiry not found with id: " + id));

        inquiry.setInquiryStatus(newStatus);
        // updatedAt is handled by @PreUpdate

        CateringInquiry updatedInquiry = cateringInquiryRepository.save(inquiry);
        return mapToDto(updatedInquiry);
    }

    public void deleteInquiry(UUID id) {
        if (!cateringInquiryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Catering inquiry not found with id: " + id);
        }
        cateringInquiryRepository.deleteById(id);
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
                .budget(inquiry.getBudget() != null ? BigDecimal.valueOf(inquiry.getBudget()) : null)
                .message(inquiry.getMessage())
                .inquiryStatus(inquiry.getInquiryStatus())
                .createdAt(inquiry.getCreatedAt())
                .updatedAt(inquiry.getUpdatedAt())
                .build();
    }
}