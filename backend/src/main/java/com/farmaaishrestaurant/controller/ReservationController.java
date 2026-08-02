package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.ReservationRequest;
import com.farmaaishrestaurant.model.Reservation;
import com.farmaaishrestaurant.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@Valid @RequestBody ReservationRequest reservationRequest) {
        Reservation createdReservation = reservationService.createReservation(reservationRequest);
        return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
    }
}