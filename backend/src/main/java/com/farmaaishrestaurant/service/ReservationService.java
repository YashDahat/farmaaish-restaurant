package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateReservationRequest;
import com.farmaaishrestaurant.dto.ReservationResponse;
import com.farmaaishrestaurant.dto.UpdateReservationStatusRequest;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Reservation;
import com.farmaaishrestaurant.model.ReservationStatus;
import com.farmaaishrestaurant.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public ReservationResponse createReservation(CreateReservationRequest request) {
        // Basic validation
        if (request.getPartySize() <= 0) {
            throw new IllegalArgumentException("Party size must be greater than 0.");
        }
        if (request.getReservationDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Reservation date cannot be in the past.");
        }
        // Additional validation for time can be added here, e.g., restaurant operating hours

        Reservation reservation = new Reservation(
                request.getCustomerName(),
                request.getCustomerEmail(),
                request.getCustomerPhone(),
                request.getReservationDate(),
                request.getReservationTime(),
                request.getPartySize(),
                request.getSpecialRequests(),
                ReservationStatus.PENDING
        );

        Reservation savedReservation = reservationRepository.save(reservation);

        // Placeholder for sending confirmation email
        // emailService.sendConfirmationEmail(savedReservation);

        return mapToReservationResponse(savedReservation);
    }

    public ReservationResponse getReservationById(UUID id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with ID: " + id));
        return mapToReservationResponse(reservation);
    }

    public List<ReservationResponse> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::mapToReservationResponse)
                .collect(Collectors.toList());
    }

    public List<ReservationResponse> getReservationsByStatus(ReservationStatus status) {
        return reservationRepository.findByStatus(status).stream()
                .map(this::mapToReservationResponse)
                .collect(Collectors.toList());
    }

    public ReservationResponse updateReservationStatus(UUID id, UpdateReservationStatusRequest request) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with ID: " + id));

        reservation.setStatus(request.getStatus());
        Reservation updatedReservation = reservationRepository.save(reservation);
        return mapToReservationResponse(updatedReservation);
    }

    private ReservationResponse mapToReservationResponse(Reservation reservation) {
        return ReservationResponse.builder()
                .id(reservation.getId())
                .customerName(reservation.getCustomerName())
                .customerEmail(reservation.getCustomerEmail())
                .customerPhone(reservation.getCustomerPhone())
                .reservationDate(reservation.getReservationDate())
                .reservationTime(reservation.getReservationTime())
                .partySize(reservation.getPartySize())
                .specialRequests(reservation.getSpecialRequests())
                .status(reservation.getStatus())
                .createdAt(reservation.getCreatedAt())
                .updatedAt(reservation.getUpdatedAt())
                .build();
    }
}