package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateReservationRequest;
import com.farmaaishrestaurant.dto.ReservationResponse;
import com.farmaaishrestaurant.exception.ReservationConflictException;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Reservation;
import com.farmaaishrestaurant.model.ReservationStatus;
import com.farmaaishrestaurant.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private static final int RESTAURANT_CAPACITY = 50;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public ReservationResponse createReservation(CreateReservationRequest request) {
        // Check for conflicts
        LocalDateTime startTime = request.getReservationTime().minusHours(1); // Example: check 1 hour before
        LocalDateTime endTime = request.getReservationTime().plusHours(1);   // Example: check 1 hour after

        List<Reservation> conflictingReservations = reservationRepository.findByReservationTimeBetween(startTime, endTime);

        int currentGuests = conflictingReservations.stream()
                .filter(r -> r.getStatus() != ReservationStatus.CANCELLED && r.getStatus() != ReservationStatus.COMPLETED)
                .mapToInt(Reservation::getNumberOfGuests)
                .sum();

        if (currentGuests + request.getNumberOfGuests() > RESTAURANT_CAPACITY) {
            throw new ReservationConflictException("Reservation conflict: Not enough capacity for " + request.getNumberOfGuests() + " guests at " + request.getReservationTime());
        }

        Reservation reservation = new Reservation();
        reservation.setCustomerName(request.getCustomerName());
        reservation.setCustomerEmail(request.getCustomerEmail());
        reservation.setCustomerPhone(request.getCustomerPhone());
        reservation.setReservationTime(request.getReservationTime());
        reservation.setNumberOfGuests(request.getNumberOfGuests());
        reservation.setSpecialRequests(request.getSpecialRequests());
        reservation.setStatus(ReservationStatus.PENDING);

        Reservation savedReservation = reservationRepository.save(reservation);
        return mapToResponse(savedReservation);
    }

    public List<ReservationResponse> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ReservationResponse getReservationById(UUID id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
        return mapToResponse(reservation);
    }

    public ReservationResponse updateReservationStatus(UUID id, ReservationStatus newStatus) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
        reservation.setStatus(newStatus);
        Reservation updatedReservation = reservationRepository.save(reservation);
        return mapToResponse(updatedReservation);
    }

    public void deleteReservation(UUID id) {
        if (!reservationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reservation not found with id: " + id);
        }
        reservationRepository.deleteById(id);
    }

    private ReservationResponse mapToResponse(Reservation reservation) {
        return ReservationResponse.builder()
                .id(reservation.getId())
                .customerName(reservation.getCustomerName())
                .customerEmail(reservation.getCustomerEmail())
                .customerPhone(reservation.getCustomerPhone())
                .reservationTime(reservation.getReservationTime())
                .numberOfGuests(reservation.getNumberOfGuests())
                .specialRequests(reservation.getSpecialRequests())
                .status(reservation.getStatus())
                .createdAt(reservation.getCreatedAt())
                .updatedAt(reservation.getUpdatedAt())
                .build();
    }
}