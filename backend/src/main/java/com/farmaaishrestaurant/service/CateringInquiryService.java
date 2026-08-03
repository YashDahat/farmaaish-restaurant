package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CateringInquiryDto;
import com.farmaaishrestaurant.model.CateringInquiry;
import com.farmaaishrestaurant.repository.CateringInquiryRepository;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CateringInquiryService {

    private final CateringInquiryRepository cateringInquiryRepository;

    public CateringInquiryService(CateringInquiryRepository cateringInquiryRepository) {
        this.cateringInquiryRepository = cateringInquiryRepository;
    }

    public CateringInquiryDto submitInquiry(CateringInquiryDto inquiryDto) {
        if (inquiryDto.getCustomerName() == null || inquiryDto.getCustomerName().trim().isEmpty() ||
            inquiryDto.getCustomerEmail() == null || inquiryDto.getCustomerEmail().trim().isEmpty() ||
            inquiryDto.getEventDate() == null ||
            inquiryDto.getNumberOfGuests() == null || inquiryDto.getNumberOfGuests() <= 0) {
            throw new IllegalArgumentException("Required fields (customerName, customerEmail, eventDate, numberOfGuests) must not be null or empty.");
        }

        CateringInquiry inquiry = new CateringInquiry();
        inquiry.setCustomerName(inquiryDto.getCustomerName());
        inquiry.setCustomerEmail(inquiryDto.getCustomerEmail());
        inquiry.setCustomerPhone(inquiryDto.getCustomerPhone());
        inquiry.setEventType(inquiryDto.getEventType());
        inquiry.setEventDate(inquiryDto.getEventDate());
        inquiry.setNumberOfGuests(inquiryDto.getNumberOfGuests());
        inquiry.setBudget(inquiryDto.getBudget());
        inquiry.setSpecialRequests(inquiryDto.getSpecialRequests());
        inquiry.setInquiryDate(LocalDateTime.now());

        CateringInquiry savedInquiry = cateringInquiryRepository.save(inquiry);
        return mapToDto(savedInquiry);
    }

    public List<CateringInquiryDto> getAllInquiries() {
        return cateringInquiryRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public CateringInquiryDto getInquiryById(Long id) {
        CateringInquiry inquiry = cateringInquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Catering inquiry not found with id: " + id));
        return mapToDto(inquiry);
    }

    public void deleteInquiry(Long id) {
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
                .eventDate(inquiry.getEventDate())
                .numberOfGuests(inquiry.getNumberOfGuests())
                .budget(inquiry.getBudget())
                .specialRequests(inquiry.getSpecialRequests())
                .inquiryDate(inquiry.getInquiryDate())
                .build();
    }
}