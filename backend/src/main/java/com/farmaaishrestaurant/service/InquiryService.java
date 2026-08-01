package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateInquiryRequest;
import com.farmaaishrestaurant.dto.InquiryResponse;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Inquiry;
import com.farmaaishrestaurant.model.InquiryStatus;
import com.farmaaishrestaurant.repository.InquiryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    public InquiryService(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    public InquiryResponse createInquiry(CreateInquiryRequest request) {
        Inquiry inquiry = new Inquiry();
        inquiry.setName(request.getCustomerName());
        inquiry.setEmail(request.getCustomerEmail());
        inquiry.setPhone(request.getCustomerPhone());
        inquiry.setEventType(request.getEventType());
        if (request.getEventDate() != null) {
            inquiry.setEventDate(request.getEventDate().atStartOfDay());
        }
        inquiry.setNumberOfGuests(request.getNumberOfGuests());
        inquiry.setMessage(request.getSpecialRequests()); // Map specialRequests to message
        inquiry.setStatus(InquiryStatus.NEW);
        inquiry.setCreatedAt(LocalDateTime.now());
        inquiry.setUpdatedAt(LocalDateTime.now());

        Inquiry savedInquiry = inquiryRepository.save(inquiry);
        return mapToInquiryResponse(savedInquiry);
    }

    public List<InquiryResponse> getAllInquiries() {
        return inquiryRepository.findAll().stream()
                .map(this::mapToInquiryResponse)
                .collect(Collectors.toList());
    }

    public InquiryResponse getInquiryById(UUID id) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found with id: " + id));
        return mapToInquiryResponse(inquiry);
    }

    public InquiryResponse updateInquiryStatus(UUID id, InquiryStatus newStatus) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found with id: " + id));

        inquiry.setStatus(newStatus);
        inquiry.setUpdatedAt(LocalDateTime.now());

        Inquiry updatedInquiry = inquiryRepository.save(inquiry);
        return mapToInquiryResponse(updatedInquiry);
    }

    private InquiryResponse mapToInquiryResponse(Inquiry inquiry) {
        return InquiryResponse.builder()
                .id(inquiry.getId())
                .customerName(inquiry.getName())
                .customerEmail(inquiry.getEmail())
                .customerPhone(inquiry.getPhone())
                .eventType(inquiry.getEventType())
                .eventDate(inquiry.getEventDate() != null ? inquiry.getEventDate().toLocalDate() : null)
                .numberOfGuests(inquiry.getNumberOfGuests())
                .specialRequests(inquiry.getMessage()) // Map message to specialRequests
                .status(inquiry.getStatus())
                .createdAt(inquiry.getCreatedAt())
                .updatedAt(inquiry.getUpdatedAt())
                .build();
    }
}