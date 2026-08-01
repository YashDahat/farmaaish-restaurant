package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.ReservationResponse;
import com.farmaaishrestaurant.dto.UpdateReservationStatusRequest;
import com.farmaaishrestaurant.model.ReservationStatus;
import com.farmaaishrestaurant.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/reservations")
public class AdminReservationController {

    private final ReservationService reservationService;

    @Autowired
    public AdminReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<List<ReservationResponse>> getAllReservations() {
        List<ReservationResponse> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationResponse> getReservationById(@PathVariable UUID id) {
        ReservationResponse reservation = reservationService.getReservationById(id);
        return ResponseEntity.ok(reservation);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ReservationResponse>> getReservationsByStatus(@PathVariable ReservationStatus status) {
        List<ReservationResponse> reservations = reservationService.getReservationsByStatus(status);
        return ResponseEntity.ok(reservations);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ReservationResponse> updateReservationStatus(
            @PathVariable UUID id,
            @RequestBody UpdateReservationStatusRequest request) {
        ReservationResponse updatedReservation = reservationService.updateReservationStatus(id, request);
        return ResponseEntity.ok(updatedReservation);
    }
}