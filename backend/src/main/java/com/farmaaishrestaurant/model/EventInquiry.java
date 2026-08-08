package com.farmaaishrestaurant.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import com.farmaaishrestaurant.model.InquiryStatus;

@Entity
public class EventInquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String eventType;
    private LocalDateTime eventDate;
    private int numberOfGuests;
    private String specialRequests;

    @Enumerated(EnumType.STRING)
    private InquiryStatus status;

    private LocalDateTime inquiryDate;

    public EventInquiry() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public int getNumberOfGuests() {
        return numberOfGuests;
    }

    public void setNumberOfGuests(int numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }

    public String getSpecialRequests() {
        return specialRequests;
    }

    public void setSpecialRequests(String specialRequests) {
        this.specialRequests = specialRequests;
    }

    public InquiryStatus getStatus() {
        return status;
    }

    public void setStatus(InquiryStatus status) {
        this.status = status;
    }

    public LocalDateTime getInquiryDate() {
        return inquiryDate;
    }

    public void setInquiryDate(LocalDateTime inquiryDate) {
        this.inquiryDate = inquiryDate;
    }
}