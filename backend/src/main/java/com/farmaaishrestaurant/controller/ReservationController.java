package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CreateReservationRequest;
import com.farmaaishrestaurant.dto.ReservationResponse;
import com.farmaaishrestaurant.exception.ReservationConflictException;
import com.farmaaishrestaurant.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody CreateReservationRequest request) {
        try {
            ReservationResponse response = reservationService.createReservation(request);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (ReservationConflictException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
        }
    }
}