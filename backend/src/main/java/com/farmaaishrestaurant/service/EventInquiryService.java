package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateEventInquiryRequest;
import com.farmaaishrestaurant.dto.EventInquiryResponse;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.EventInquiry;
import com.farmaaishrestaurant.model.InquiryStatus;
import com.farmaaishrestaurant.repository.EventInquiryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class EventInquiryService {

    private final EventInquiryRepository eventInquiryRepository;

    public EventInquiryService(EventInquiryRepository eventInquiryRepository) {
        this.eventInquiryRepository = eventInquiryRepository;
    }

    public EventInquiryResponse createInquiry(CreateEventInquiryRequest request) {
        EventInquiry eventInquiry = new EventInquiry();
        eventInquiry.setCustomerName(request.getCustomerName());
        eventInquiry.setCustomerEmail(request.getCustomerEmail());
        eventInquiry.setCustomerPhone(request.getCustomerPhone());
        eventInquiry.setEventType(request.getEventType());
        eventInquiry.setEventDate(request.getEventDate().atStartOfDay()); // Convert LocalDate to LocalDateTime
        eventInquiry.setNumberOfGuests(request.getNumberOfGuests());
        eventInquiry.setSpecialRequests(request.getSpecialRequests());
        eventInquiry.setStatus(InquiryStatus.NEW);
        eventInquiry.setInquiryDate(LocalDateTime.now());

        EventInquiry savedInquiry = eventInquiryRepository.save(eventInquiry);
        return mapToResponse(savedInquiry);
    }

    public List<EventInquiryResponse> getAllInquiries() {
        return eventInquiryRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public EventInquiryResponse getInquiryById(UUID inquiryId) {
        EventInquiry eventInquiry = eventInquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new ResourceNotFoundException("Event inquiry not found with ID: " + inquiryId));
        return mapToResponse(eventInquiry);
    }

    public EventInquiryResponse updateInquiryStatus(UUID inquiryId, InquiryStatus newStatus) {
        EventInquiry eventInquiry = eventInquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new ResourceNotFoundException("Event inquiry not found with ID: " + inquiryId));
        eventInquiry.setStatus(newStatus);
        EventInquiry updatedInquiry = eventInquiryRepository.save(eventInquiry);
        return mapToResponse(updatedInquiry);
    }

    private EventInquiryResponse mapToResponse(EventInquiry eventInquiry) {
        return EventInquiryResponse.builder()
                .id(eventInquiry.getId())
                .customerName(eventInquiry.getCustomerName())
                .customerEmail(eventInquiry.getCustomerEmail())
                .customerPhone(eventInquiry.getCustomerPhone())
                .eventType(eventInquiry.getEventType())
                .eventDate(eventInquiry.getEventDate().toLocalDate()) // Convert LocalDateTime back to LocalDate
                .numberOfGuests(eventInquiry.getNumberOfGuests())
                .specialRequests(eventInquiry.getSpecialRequests())
                .inquiryDate(eventInquiry.getInquiryDate())
                .status(eventInquiry.getStatus())
                .build();
    }
}