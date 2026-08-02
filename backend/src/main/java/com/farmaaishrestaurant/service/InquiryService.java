package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.InquiryDto;
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

    public InquiryDto createInquiry(InquiryDto inquiryDto) {
        Inquiry inquiry = new Inquiry();
        inquiry.setCustomerName(inquiryDto.getCustomerName());
        inquiry.setCustomerEmail(inquiryDto.getCustomerEmail());
        inquiry.setCustomerPhone(inquiryDto.getCustomerPhone());
        inquiry.setEventType(inquiryDto.getEventType());
        inquiry.setEventDate(inquiryDto.getEventDate().atStartOfDay()); // Convert LocalDate to LocalDateTime
        inquiry.setNumberOfGuests(inquiryDto.getNumberOfGuests());
        inquiry.setMessage(inquiryDto.getMessage());
        inquiry.setInquiryDate(LocalDateTime.now());
        inquiry.setStatus(InquiryStatus.NEW);

        Inquiry savedInquiry = inquiryRepository.save(inquiry);
        return mapToDto(savedInquiry);
    }

    public List<InquiryDto> getAllInquiries() {
        return inquiryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public InquiryDto getInquiryById(UUID id) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found with id: " + id));
        return mapToDto(inquiry);
    }

    public InquiryDto updateInquiryStatus(UUID id, InquiryStatus newStatus) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inquiry not found with id: " + id));
        inquiry.setStatus(newStatus);
        Inquiry updatedInquiry = inquiryRepository.save(inquiry);
        return mapToDto(updatedInquiry);
    }

    public void deleteInquiry(UUID id) {
        if (!inquiryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Inquiry not found with id: " + id);
        }
        inquiryRepository.deleteById(id);
    }

    private InquiryDto mapToDto(Inquiry inquiry) {
        return InquiryDto.builder()
                .id(inquiry.getId())
                .customerName(inquiry.getCustomerName())
                .customerEmail(inquiry.getCustomerEmail())
                .customerPhone(inquiry.getCustomerPhone())
                .eventType(inquiry.getEventType())
                .eventDate(inquiry.getEventDate().toLocalDate()) // Convert LocalDateTime to LocalDate
                .numberOfGuests(inquiry.getNumberOfGuests())
                .message(inquiry.getMessage())
                .inquiryDate(inquiry.getInquiryDate())
                .status(inquiry.getStatus())
                .build();
    }
}