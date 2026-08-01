package com.farmaaishrestaurant.repository;

import com.farmaaishrestaurant.model.GalleryImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface GalleryImageRepository extends JpaRepository<GalleryImage, UUID> {
    List<GalleryImage> findAllByOrderByDisplayOrderAsc();
}