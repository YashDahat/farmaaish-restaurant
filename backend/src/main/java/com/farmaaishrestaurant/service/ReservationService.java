package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateReservationRequest;
import com.farmaaishrestaurant.dto.ReservationResponse;
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
        if (request.getPartySize() <= 0) {
            throw new IllegalArgumentException("Party size must be greater than 0.");
        }
        if (request.getReservationDate().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("Reservation date cannot be in the past.");
        }
        // Basic time validation, e.g., restaurant operating hours (simplified for this exercise)
        if (request.getReservationTime().isBefore(LocalTime.of(9, 0)) || request.getReservationTime().isAfter(LocalTime.of(22, 0))) {
            throw new IllegalArgumentException("Reservation time must be between 9:00 and 22:00.");
        }

        Reservation reservation = new Reservation(
                request.getCustomerName(),
                request.getCustomerEmail(),
                request.getCustomerPhone(),
                request.getReservationDate(),
                request.getReservationTime(),
                request.getPartySize(),
                ReservationStatus.PENDING
        );
        Reservation savedReservation = reservationRepository.save(reservation);
        return convertToDto(savedReservation);
    }

    public ReservationResponse getReservationById(UUID id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with ID: " + id));
        return convertToDto(reservation);
    }

    public List<ReservationResponse> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ReservationResponse> getReservationsByStatus(ReservationStatus status) {
        return reservationRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ReservationResponse updateReservationStatus(UUID id, ReservationStatus newStatus) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with ID: " + id));
        reservation.setStatus(newStatus);
        Reservation updatedReservation = reservationRepository.save(reservation);
        return convertToDto(updatedReservation);
    }

    public void deleteReservation(UUID id) {
        if (!reservationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reservation not found with ID: " + id);
        }
        reservationRepository.deleteById(id);
    }

    private ReservationResponse convertToDto(Reservation reservation) {
        return ReservationResponse.builder()
                .id(reservation.getId())
                .customerName(reservation.getCustomerName())
                .customerEmail(reservation.getCustomerEmail())
                .customerPhone(reservation.getCustomerPhone())
                .reservationDate(reservation.getReservationDate())
                .reservationTime(reservation.getReservationTime())
                .partySize(reservation.getPartySize())
                .status(reservation.getStatus())
                .build();
    }
}