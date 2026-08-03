package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateReservationRequest;
import com.farmaaishrestaurant.dto.ReservationDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Reservation;
import com.farmaaishrestaurant.model.ReservationStatus;
import com.farmaaishrestaurant.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public ReservationDto createReservation(CreateReservationRequest request) {
        Reservation reservation = new Reservation();
        reservation.setCustomerName(request.getCustomerName());
        reservation.setCustomerPhone(request.getCustomerPhone());
        reservation.setCustomerEmail(request.getCustomerEmail());
        reservation.setPartySize(request.getPartySize());
        reservation.setReservationDate(request.getReservationDate());
        reservation.setReservationTime(request.getReservationTime());
        reservation.setSpecialRequests(request.getSpecialRequests());
        reservation.setStatus(ReservationStatus.PENDING);

        Reservation savedReservation = reservationRepository.save(reservation);
        return mapToDto(savedReservation);
    }

    public List<ReservationDto> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<ReservationDto> getReservationsByDateRange(LocalDate startDate, LocalDate endDate) {
        return reservationRepository.findByReservationDateBetweenOrderByReservationTimeAsc(startDate, endDate).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ReservationDto getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
        return mapToDto(reservation);
    }

    public ReservationDto updateReservationStatus(Long id, ReservationStatus newStatus) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
        reservation.setStatus(newStatus);
        Reservation updatedReservation = reservationRepository.save(reservation);
        return mapToDto(updatedReservation);
    }

    public void deleteReservation(Long id) {
        if (!reservationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reservation not found with id: " + id);
        }
        reservationRepository.deleteById(id);
    }

    private ReservationDto mapToDto(Reservation reservation) {
        return ReservationDto.builder()
                .id(reservation.getId())
                .customerName(reservation.getCustomerName())
                .customerPhone(reservation.getCustomerPhone())
                .customerEmail(reservation.getCustomerEmail())
                .partySize(reservation.getPartySize())
                .reservationDate(reservation.getReservationDate())
                .reservationTime(reservation.getReservationTime())
                .specialRequests(reservation.getSpecialRequests())
                .status(reservation.getStatus())
                .createdAt(reservation.getCreatedAt())
                .build();
    }
}