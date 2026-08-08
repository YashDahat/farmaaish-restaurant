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
public class UpdateReservationStatusRequest {
    private ReservationStatus status;
}
