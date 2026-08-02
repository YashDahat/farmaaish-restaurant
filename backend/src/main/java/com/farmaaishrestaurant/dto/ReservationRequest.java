package com.farmaaishrestaurant.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequest {
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private java.time.LocalDate reservationDate;
    private LocalTime reservationTime;
    private Integer numberOfGuests;
    private String specialRequests;
}
