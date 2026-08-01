package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CreateReservationRequest;
import com.farmaaishrestaurant.dto.ReservationResponse;
import com.farmaaishrestaurant.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<ReservationResponse> createReservation(@Valid @RequestBody CreateReservationRequest request) {
        ReservationResponse newReservation = reservationService.createReservation(request);
        return new ResponseEntity<>(newReservation, HttpStatus.CREATED);
    }
}