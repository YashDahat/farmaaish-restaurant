package com.farmaaishrestaurant.repository;

import com.farmaaishrestaurant.model.SpecialOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface SpecialOfferRepository extends JpaRepository<SpecialOffer, UUID> {
    List<SpecialOffer> findByIsActiveTrueAndEndDateAfter(LocalDate date);
}