package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.ReservationRequest;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Reservation;
import com.farmaaishrestaurant.model.ReservationStatus;
import com.farmaaishrestaurant.repository.ReservationRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import com.farmaaishrestaurant.model.Customer;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public Reservation createReservation(ReservationRequest request) {
        Reservation reservation = new Reservation();
        reservation.setCustomerName(request.getCustomerName());
        // Prioritize email if available, otherwise use phone
        if (request.getCustomerEmail() != null && !request.getCustomerEmail().isEmpty()) {
            reservation.setCustomerContact(request.getCustomerEmail());
        } else if (request.getCustomerPhone() != null && !request.getCustomerPhone().isEmpty()) {
            reservation.setCustomerContact(request.getCustomerPhone());
        } else {
            // Handle case where neither email nor phone is provided, or throw an exception
            throw new IllegalArgumentException("Customer contact (email or phone) must be provided.");
        }
        reservation.setReservationDate(request.getReservationDate());
        reservation.setReservationTime(request.getReservationTime());
        reservation.setPartySize(request.getNumberOfGuests());
        reservation.setStatus(ReservationStatus.PENDING); // Initial status

        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(UUID id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
    }

    public Reservation updateReservation(UUID id, Reservation updatedReservation) {
        Reservation existingReservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));

        existingReservation.setCustomerName(updatedReservation.getCustomerName());
        existingReservation.setCustomerContact(updatedReservation.getCustomerContact());
        existingReservation.setReservationDate(updatedReservation.getReservationDate());
        existingReservation.setReservationTime(updatedReservation.getReservationTime());
        existingReservation.setPartySize(updatedReservation.getPartySize());
        existingReservation.setStatus(updatedReservation.getStatus());

        return reservationRepository.save(existingReservation);
    }

    public void deleteReservation(UUID id) {
        if (!reservationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reservation not found with id: " + id);
        }
        reservationRepository.deleteById(id);
    }
}