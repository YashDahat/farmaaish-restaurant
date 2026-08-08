package com.farmaaishrestaurant.repository;

import com.farmaaishrestaurant.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    List<Reservation> findByReservationTimeBetween(LocalDateTime startTime, LocalDateTime endTime);
}