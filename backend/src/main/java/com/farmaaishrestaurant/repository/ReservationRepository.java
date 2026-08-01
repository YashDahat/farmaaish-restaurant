package com.farmaaishrestaurant.repository;

import com.farmaaishrestaurant.model.Reservation;
import com.farmaaishrestaurant.model.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    List<Reservation> findByReservationDate(LocalDate reservationDate);
    List<Reservation> findByStatus(ReservationStatus status);
    List<Reservation> findByCustomerEmail(String customerEmail);
    List<Reservation> findByCustomerPhone(String customerPhone);
}