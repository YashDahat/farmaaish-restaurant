package com.farmaaishrestaurant.repository;

import com.farmaaishrestaurant.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByReservationDateBetweenOrderByReservationTimeAsc(LocalDate startDate, LocalDate endDate);
}