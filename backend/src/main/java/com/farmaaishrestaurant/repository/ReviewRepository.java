package com.farmaaishrestaurant.repository;

import com.farmaaishrestaurant.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findByIsFeatured(boolean isFeatured);
}