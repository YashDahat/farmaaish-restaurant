package com.farmaaishrestaurant.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CateringInquiryDto {
    private Long id;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String eventType;
    private java.time.LocalDate eventDate;
    private Integer numberOfGuests;
    private java.math.BigDecimal budget;
    private String specialRequests;
    private LocalDateTime inquiryDate;
}
