package com.farmaaishrestaurant.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.farmaaishrestaurant.model.ReservationStatus;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    private UUID id;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private Integer numberOfGuests;
    private java.time.LocalDate reservationDate;
    private java.time.LocalTime reservationTime;
    private String specialRequests;
    private ReservationStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
