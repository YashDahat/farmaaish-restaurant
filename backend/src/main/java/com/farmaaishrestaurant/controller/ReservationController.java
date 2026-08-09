package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CreateReservationRequest;
import com.farmaaishrestaurant.dto.ReservationDto;
import com.farmaaishrestaurant.service.ReservationService;
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
    public ResponseEntity<ReservationDto> createReservation(@RequestBody CreateReservationRequest request) {
        try {
            ReservationDto createdReservation = reservationService.createReservation(request);
            return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}