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
import com.farmaaishrestaurant.model.ReservationStatus;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    private Long id;
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private Integer partySize;
    private java.time.LocalDate reservationDate;
    private LocalTime reservationTime;
    private String specialRequests;
    private ReservationStatus status;
    private LocalDateTime createdAt;
}
